import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import NavBar from "./NavBar";
import Player from "./Player";
import { Tracks } from "./Tracks";
import { Albums } from "./Albums";
import { Artist, Track, Album } from "../types";
import Auth from "./Auth";
import { Artists } from "./Artists";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const accessToken = Auth();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const searchSpotify = () => {
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
        console.log(data);
        setArtists(data.artists.items);
        setAlbums(data.albums.items);
        setTracks(data.tracks.items);
      });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
          <Artists artist={artists} />
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
