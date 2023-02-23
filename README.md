
# Spotify Top Tracks Fetcher




## Overview

This project is a simple application that fetches data from the Spotify REST API and displays it to the user in a simple table format. The data that is fetched consists of the top tracks of any artist, which can be chosen by the user.

## Features

The application includes the following features:

Artist selection: Allows the user to choose the artist whose top tracks they wish to display.

Top tracks display: Displays a table of the top tracks of the selected artist, including the track's name, id, album, popularity, and genres.

## Setup
To use this application, you will need to have a Spotify account and create a Spotify app to obtain your own client ID and client secret.

Once you have your client ID and client secret, you will need to change ``.env`` file in ``/services/api/``:

`` SPOTIPY_CLIENT_ID='<you ID>'``

`` SPOTIPY_CLIENT_SECRET='<you SECRET>'``


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Docker
* Docker Compose

### Running the Application

* Clone the repository: `https://github.com/Tricked111/Spotify-Top-Tracks-Fetcher.git`

* Build the Docker image:
`` $ docker build -f services/api/Dockerfile -t flask-api:1.0 services/api/ ``

`` $ docker build -f services/frontend/Dockerfile -t react-app:1.0 services/frontend/ ``



* Start the Docker container:
 `$ docker run -d -p 5000:5000 flask-api:1.0 `

`$ docker run -d -p 3000:3000 react-app:1.0 `

The application should now be accessible at http://localhost:3000.




## Authors
* Daniil Kniazkin
