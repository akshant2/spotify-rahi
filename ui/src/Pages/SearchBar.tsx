import React, { useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Auth from "../utils/Auth";
import NavBar from "../components/NavBar";
import Player from "../components/Player";
import { Playlists } from "../components/Playlists";
import { Tracks } from "../components/Tracks";
import { Albums } from "../components/Albums";
import { Artists } from "../components/Artists";
import { green } from "@mui/material/colors";
import { Artist, Track, Album, Playlist, API } from "../types";

export default function SearchBar() {
  const accessToken = Auth();
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<{
    tracks: Track[];
    artists: Artist[];
    albums: Album[];
    playlists: Playlist[];
  }>({
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
  });
  const [display, setDisplay] = useState(false);

  const searchSpotify = (token: string | null) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track,playlist`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        setResults({
          tracks: data.tracks.items,
          artists: data.artists.items,
          albums: data.albums.items,
          playlists: data.playlists.items,
        });
      });
  };

  const render = () => {
    if (display) {
      return (
        <div>
          <div className="p-5 bg-zinc-900">
            <h2 className="text-2xl font-bold text-white">Top Results</h2>
            <div className="">
              <Artists artist={results.artists} n={5} />
            </div>
          </div>

          <div className="h-screen overflow-x-auto mt-6 bg-gray-200 relative">
            <Tracks track={results.tracks} albumImage="" />
          </div>

          <div className="bg-zinc-900 mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 ">
            <div className="h-auto overflow-x-auto relative">
              <h2 className="p-2 text-2xl font-bold text-white">Playlists</h2>
              <Playlists
                playlist={results.playlists}
                startIndex={0}
                endIndex={5}
              />
            </div>
          </div>
          <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-black">
            <h2 className="text-2xl font-bold text-white">Albums</h2>
            <div className="inline-flex">
              <Albums album={results.albums} n={15} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="justify center bg-black">
        <TextField
          className="justify-center p-2 rounded-md bg-zinc-900"
          autoFocus={true}
          color="success"
          variant="filled"
          placeholder="Search for Artists, Songs, and Albums"
          fullWidth
          sx={{ input: { color: green[50] } }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchOutlined sx={{ color: green[50] }} />
              </IconButton>
            ),
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchSpotify(accessToken);
              setDisplay(true);
            }
          }}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
      </div>
      {render()}
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}
