import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Spotify API
spot = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    )
)

# Flask
app = Flask(__name__)
cors = CORS(app)
app.config["JSON_SORT_KEYS"] = False


@app.route("/api/v1/<string:search>", methods=["GET"])
def search(search):
    """
    This function will return the artist name, genres and top tracks
    """
    result_serch = spot.search(q="artist:" + search, type="artist", limit=10)

    if result_serch:
        artist = result_serch["artists"]["items"][0]
        tracks = spot.artist_top_tracks(artist["uri"])

        return jsonify(
            {
                "artist_name": artist["name"],
                "genres": artist["genres"],
                "tracks": [
                    {
                        "track_name": track["name"],
                        "album_name": track["album"]["name"],
                        "popularity": track["popularity"],
                        "img": track["album"]["images"][0]["url"],
                    }
                    for track in tracks["tracks"]
                ],
            }
        )
    return jsonify({"error": "Artist not found"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
