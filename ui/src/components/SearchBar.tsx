import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import NavBar from "./NavBar";
import Player from "./Player";
import { Tracks } from "./Tracks";
import { Albums } from "../styles/Albums";
import { Artist, Track, Album } from "../types/types";
import Auth from "./Auth";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const accessToken = Auth();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const searchSpotify = () => {
    //console.log(searchInput);
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setArtists(data.artists.items);
        setAlbums(data.albums.items);
        setTracks(data.tracks.items);
      });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateWithArtist = (artistId: string) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setTracks(data.tracks);
      });

    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?market=US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setAlbums(data.items);
      });
  };

  return (
    <div>
      <NavBar />
      <TextField
        sx={{ mx: "auto" }}
        className="w-full p-4 pl-10 rounded-lg bg-zinc-200"
        color="success"
        id="outlined-basic"
        placeholder="Search for Artists, Songs, and Albums"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchOutlined />
            </IconButton>
          ),
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            searchSpotify();
          }
        }}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      <div className="py-5 sm:px-6 lg:px-10 bg-gray-100">
        <h2 className="text-2xl font-bold text-zinc-900">Top Results</h2>
        <div className="">
          <div className="py-4 bg-gray-200 overflow-y-auto h-80 px-10 mt-6 grid grid-cols-5 gap-y-10 gap-x-6">
            {artists.slice(0, 10).map((artist) => (
              <div key={artist.id} className="group relative">
                <div className="bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                  <img
                    src={artist.images.length > 0 ? artist.images[0].url : ""}
                    className="rounded-md h-60 w-60 object-cover object-center"
                    alt="Artist Image"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      <a onClick={() => updateWithArtist(artist.id)}>
                        <span
                          aria-hidden="true"
                          className="object-center absolute inset-0"
                        />
                        {artist.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">Artist</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-screen overflow-x-auto mt-6 bg-gray-200 relative">
            <Tracks track={tracks} />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-zinc-900">
        <h2 className="text-2xl font-bold text-white">Albums</h2>
        <div className="inline-flex">
          <Albums album={albums} />
        </div>
      </div>
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}
