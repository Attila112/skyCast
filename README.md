# SkyCast

This weather application, built with Vue.js, displays real-time temperature data on an interactive map using the Leaflet library, as shown by the marker indicating at the user’s location. The application combines geolocation services with weather API data to provide precise local temperature readings, visualized through a clean and responsive interface. The map interface includes standard navigation controls and layer switching options between satellite and street views, making it easy for users to explore weather conditions in different locations.
![Image1](public/screenshot1.png)
## Table of Contents
- [SkyCast](#skycast)   
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Docker Setup](#docker-setup)
  - [API Information](#api-information)
  - [Contributors](#contributors)
  - [License](#license)

---

## Technologies Used

- **Frontend Framework**
  - Vue.js 3 (Composition API)
  - Vite as build tool

- **Libraries & Tools**
  - Axios for API requests
  - Leaflet.js for map integration
  - Vue Router for navigation
  - CSS3 for responsive design and animations

- **APIs & Services**
  - OpenWeatherMap API
  - Leaflet Maps
  - Time API
  - CountriesNow API

- **Development & Deployment**
  - Docker for containerization
  - Nginx as web server
  - Git for version control

The application leverages modern web technologies and APIs to create a responsive, real-time weather tracking system with interactive mapping capabilities.

## Project Overview

This weather application project was created as a learning opportunity to explore Vue.js framework capabilities, focusing on building an interactive web application with real-time data visualization. The project combines Vue.js with the Leaflet map library to display location-based weather information, serving both as a practical weather tool and a hands-on experience in modern frontend development with Vue.js.

![image2](public/screenshot2.png)
## Features

- **Interactive Map Integration**: Utilizes Leaflet.js for displaying an interactive map with custom markers showing temperature data
- **Real-time Weather Data**: Shows current temperature and location information through a popup marker system.
- **Layer Control**: Supports multiple map layer options including satellite view and street map view.
- **Responsive Design**: Fully responsive layout that adapts to different screen sizes and devices.
- **Geolocation Support**: Automatically detects and displays user’s current location with temperature data.
- **Dynamic Updates**: Updates weather information and map markers in real-time when location changes.
- **Custom Styling**: Features different background themes based on time of day and weather conditions.



## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Attila112/skyCast
   cd skyCast 
    ```
2.  **Install dependencies**:
    ```bash    
    npm install
     ```
3.  **Start the development server**:
    
    ```bash
    npm run dev
     ``` 
The website will be available at `http://localhost:5173`.

## Usage

1. **Weather Display**
- View current temperature via marker popup
- Background changes based on time of day
- Automatic location detection

2. **Map Navigation**
- Interactive map with temperature marker
- Switch between satellite and street views
- Zoom and pan controls available

----------

## Docker Setup

To run the project using Docker, follow these steps:

1.  **Build the Docker image**:
    
    ```bash
    docker build -t skycast .
    ```
2.  **Run the Docker container**:
    
    ```bash
    docker run -p 8080:80 -d skycast
    ```
3.  Once the containers are up, access the website at `http://localhost:8080`.
    

----------

## API Information

This application integrates several third-party APIs to provide comprehensive weather and mapping functionality:

- **OpenWeatherMap API**: Provides real-time temperature data and weather conditions
- **Leaflet**: Powers the interactive mapping system with customizable layers and markers
- **Time API**: Enables dynamic background changes based on current time of day
- **CountriesNow API**: Handles location and country-specific data management

These APIs work together to deliver accurate location-based weather information with an interactive map interface.


## Contributors
-   **Attila** - [@Attila112](https://github.com/Attila112)

## License
This project is licensed under the MIT License.
