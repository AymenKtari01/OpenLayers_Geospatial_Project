const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3200; 

app.use(cors());
app.use(bodyParser.json());
const addFeatureEndpoint = '/saveFeature';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'OpenLayersProject',
    password: 'pgadmin',
    port: 5432,
});

const setupScript = `
  CREATE TABLE IF NOT EXISTS point_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(Point, 4326)
  );

  CREATE TABLE IF NOT EXISTS line_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(LineString, 4326)
);

  CREATE TABLE IF NOT EXISTS polygon_shapes (
    id SERIAL PRIMARY KEY,
    feature_type VARCHAR(255),
    geometry GEOMETRY(Polygon, 4326)
);
`;

client.connect();

// Run the setup script
client.query(setupScript)
    .then(() => console.log('Database setup successful'))
    .catch(err => {
        console.error('Error setting up database:', err);
        client.end();
    });


app.post(addFeatureEndpoint, (req, res) => {
    const { featureType, geometry } = req.body;
    const tableName = getTableName(featureType);

    const query = `
    INSERT INTO ${tableName} (feature_type, geometry)
    VALUES ($1, ST_GeomFromText($2, 4326))
    RETURNING id;
  `;

    client.query(query, [featureType, geometry])
        .then(result => {
            res.status(200).json({ id: result.rows[0].id });
        })
        .catch(err => {
            console.error(`Error saving ${featureType} feature:`, err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

function getTableName(featureType) {
    switch (featureType) {
        case 'point':
            return 'point_shapes';
        case 'line':
            return 'line_shapes';
        case 'polygon':
            return 'polygon_shapes';
        default:
            return 'cv_shapes';
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
