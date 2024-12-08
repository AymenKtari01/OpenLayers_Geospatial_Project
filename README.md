# 🌍 OpenLayers Geospatial Project

Welcome to the **OpenLayers Geospatial Project**! This repository provides all the necessary components for visualizing, managing, and interacting with geospatial data using **OpenLayers**, **GeoServer**, and **PostgreSQL/PostGIS**.

---

## 📚 Table of Contents

- [🚀 Project Overview](#-project-overview)
- [📂 Project Architecture](#-project-architecture)
- [🛠 Prerequisites](#-prerequisites)
- [📦 Installation and Setup](#-installation-and-setup)
  - [1. PostgreSQL and PostGIS Setup](#1-postgresql-and-postgis-setup)
  - [2. GeoServer Configuration](#2-geoserver-configuration)
  - [3. Backend Server Setup](#3-backend-server-setup)
  - [4. OpenLayers Client Setup](#4-openlayers-client-setup)
- [📂 JS Files](#-js-files)
  - [🗺 osm.js](#-osmjs)
  - [🌍 geoserver.js](#-geoserverjs)
  - [🌐 osm_gs.js](#-osm-gsjs)
- [📋 How It Works](#-how-it-works)
- [📸 Web Interface](#-web-interface)
- [👥 Contribution](#-contribution)
- [📄 Project By](#-project-by)

---

## 🚀 Project Overview

This project enables you to:

1. **Visualize Geospatial Layers**: Display maps and spatial data interactively using **OpenLayers**.
2. **Manage Geospatial Data**: Publish, query, and update geospatial data through **GeoServer** and **PostgreSQL/PostGIS**.
3. **Serve Data Efficiently**: Leverage Web Map Service (WMS) or Web Feature Service (WFS) to exchange data seamlessly.

---

## 📂 **Project Architecture**

![Architecture](images/Architecture.png)

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your system:

| **Prerequisite**                              | **Description**                               |
| --------------------------------------------- | --------------------------------------------- |
| **npm** and **Node.js**                       | Required to run the backend server.           |
| **PostgreSQL** with the **PostGIS Extension** | For geospatial data storage.                  |
| **GeoServer**                                 | To publish and manage geospatial layers.      |
| **Web Interface**                             | To interact with the OpenLayers-based client. |

---

## 📦 Installation and Setup

### 1. PostgreSQL and PostGIS Setup (For Windows)

1. **Install PostgreSQL**:

   - Download PostgreSQL for Windows from the [official website](https://www.postgresql.org/download/windows/).
   - Follow the installation wizard and select **PostGIS** during the setup.

2. **Create a Database for Geospatial Data**:

   - Open **pgAdmin** and connect to your PostgreSQL server.
   - Create a new database and add the **PostGIS extension**:
     ```sql
     CREATE DATABASE spatial_data;
     \c spatial_data
     CREATE EXTENSION postgis;
     ```

3. **Configure Database Credentials**:
   - Modify the `server` code (e.g., `service.js`) to use your PostgreSQL connection details.
4. **Ensure PostgreSQL is running and set up a database to store your geospatial data.**

---

### 2. GeoServer Configuration

1. **Install GeoServer**:

   - Download GeoServer from [geoserver.org](https://geoserver.org/).
   - Follow the installation instructions for your operating system.

2. **Create a New Layer**:

   - Access the GeoServer web interface (`http://localhost:8080/geoserver`).
   - Add a **data store** connection (e.g., PostgreSQL database).
   - Create a **new layer** by importing data from your database or uploading a file (e.g., a shapefile).

   **Layers to be fetched from the GeoServer instance**:

   - **gis_osm_landuse_a_free_1** (land use)
   - **gis_osm_roads_free_1** (road network)
   - **gis_osm_pois_free_1** (points of interest)
   - **gis_osm_places_free_1** (places and cities)
   - **civ_adm1, civ_adm2, civ_adm3** (administrative boundaries)
   - **point_shapes, line_shapes, polygon_shapes** (user-drawn geometries)

   Ensure these layers are configured and publicly accessible from GeoServer.

   **GeoServer layer creation interface:**

   ![GeoServer Layer Creation](images/geoServer_layer_creation.PNG)

3. **Configure Styles**:

   - Use **SLD** (Styled Layer Descriptor) files to define the appearance of your layers. This allows you to customize the display styles of each layer to suit your preferences.

4. **Test the Services**:
   - Verify that the **WMS** (Web Map Service) and **WFS** (Web Feature Service) endpoints are functioning correctly by testing the services through the GeoServer web interface.

---

### 3. Backend Server Setup

1. **Navigate to the Server Directory**:

   ```bash
   cd server
   ```

2. **Install Dependencies and Start the Server**:

   ```bash
   npm install
   node service.js
   ```

   The server will act as middleware, connecting the **PostgreSQL** database and **GeoServer** to the **OpenLayers** client.

---

### 4. OpenLayers Client Setup

1. **Visualizing Layers with OpenLayers 🎯**

   The client implementation uses **JavaScript**, **CSS**, and **HTML** with the **OpenLayers** library to fetch layers from the **GeoServer** WMS service and display them interactively. You can customize the map interface to show geospatial data, allowing users to interact with and explore the spatial layers.

2. **Integration Steps**:

   - Link your **WMS** endpoints from **GeoServer** to the **OpenLayers** map object in your client code.
   - Customize the interface to include interactive features like zooming, panning, and querying the layers.

3. **Host the Client**:
   - Deploy your **OpenLayers** map on a **local** or **remote** web server for public or internal access.

---

## 📂 **JS Files**

### 🗺 **osm.js**

Integrates **OpenStreetMap** as a base map with **GeoServer** layers. Supports interaction with custom shape layers (Points, Lines, Polygons) and includes drawing functionality to add features to the map and store their coordinates.

### 🌍 **geoserver.js**

Configures **OpenLayers** to interact with **GeoServer**’s WMS service. Displays layers like **Land Use**, **Roads**, **POIs**, **Places**, and **Administrative Boundaries** (adm1, adm2, adm3). Includes a **layer switcher** to control visibility.

### 🌐 **osm_gs.js**

Combines **OpenStreetMap** with **GeoServer** layers, similar to **geoserver.js**, but also includes additional layers for custom shapes such as **Point**, **Line**, and **Polygon**. Allows users to draw shapes and save coordinates (points, circles, lines, polygons), which are stored in the `drawnFeatures` variable.

---

## 📋 How It Works

1. **Data Flow**:

   - Spatial data is uploaded to **GeoServer** or stored directly in **PostgreSQL/PostGIS**.
   - **GeoServer** publishes this data as **WMS/WFS** services.
   - The backend server interacts with **GeoServer** and **PostgreSQL** to serve data to the web client.

2. **User Interaction**:

   - Users view and interact with the data via the **OpenLayers** web application.

3. **Data Storage and Updates**:
   - **PostgreSQL/PostGIS** handles spatial data storage and processing, while **GeoServer** enables visualization.

---

## 📸 Web Interface

1. **Interactive Map with OpenLayers**

   ![OpenLayers Map](images/openlayermap.png)

2. **Displaying Shapes from the Database**

   ![Shapes Display](images/polygone.PNG)

3. **Zoomed-in View of a Local Position**

   ![Local Position](images/my_position.png)

4. **Displaying the Global View of the Map**

   ![Global View](images/global_view.png)

---

## 👥 Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request describing your changes.

---

## **🧑‍💻 Project By**

<a href="https://github.com/AnasBenAmor10/OpenLayers_Geospatial_Project/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=AnasBenAmor10/OpenLayers_Geospatial_Project" />
</a>

---
