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
import { Artist, Track, Album, Playlist, API } from "../types";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [option, setOption] = useState("");
  const accessToken = Auth();

  const searchSpotify = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track,playlist`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        console.log(data);
        setArtists(data.artists.items);
        setAlbums(data.albums.items);
        setTracks(data.tracks.items);
        setPlaylists(data.playlists.items);
      });
  };

  const renderOption = () => {
    if (option == "playlists") {
      return (
        <div className="bg-black mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 ">
          <div className="h-auto overflow-x-auto relative">
            <h2 className="p-2 text-2xl font-bold text-white">Playlists</h2>
            <Playlists playlist={playlists} n={20} />
          </div>
        </div>
      );
    } else if (option == "artists") {
      return (
        <div className="py-5 sm:px-6 lg:px-10 bg-black">
          <h2 className="text-2xl font-bold text-white">Artists</h2>
          <Artists artist={artists} n={20} />{" "}
        </div>
      );
    } else if (option == "albums") {
      return (
        <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-black">
          <h2 className="text-2xl font-bold text-white">Albums</h2>
          <div className="inline-flex">
            <Albums album={albums} n={20} />
          </div>
        </div>
      );
    } else if (option == "all") {
      return (
        <div>
          <div className="py-5 sm:px-6 lg:px-10 bg-gray-100">
            <h2 className="text-2xl font-bold text-zinc-900">Top Results</h2>
            <div className="p-5">
              <Artists artist={artists} n={5} />
            </div>

            <div className="h-screen overflow-x-auto mt-6 bg-gray-200 relative">
              <Tracks track={tracks} albumImage="" />
            </div>
          </div>
          <div className="bg-zinc-900 mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 ">
            <div className="h-auto overflow-x-auto relative">
              <h2 className="p-2 text-2xl font-bold text-white">Playlists</h2>
              <Playlists playlist={playlists} n={4} />
            </div>
          </div>
          <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-black">
            <h2 className="text-2xl font-bold text-white">Albums</h2>
            <div className="inline-flex">
              <Albums album={albums} n={10} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="justify center bg-zinc-900">
        <TextField
          className="justify-center p-2 rounded-md bg-zinc-800"
          autoFocus={true}
          color="success"
          variant="outlined"
          placeholder="Search for Artists, Songs, and Albums"
          fullWidth
          sx={{ input: { color: "white" } }}
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
              setOption("all");
            }
          }}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
      </div>
      <div className="bg-zinc-900 flex space-x-4 justify-center p-3">
        <Button
          onClick={() => setOption("all")}
          className={`${
            option === "all" ? "btn active" : "btn"
          } bg-green-500 text-zinc-900`}
          variant="contained"
        >
          All
        </Button>
        <Button
          className="bg-zinc-800 text-white rounded-full px-3 py-2 text-sm font-medium"
          onClick={() => setOption("playlists")}
        >
          Playlists
        </Button>
        <Button
          className="bg-zinc-800 text-white rounded-full px-3 py-2 text-sm font-medium"
          onClick={() => setOption("artists")}
        >
          Artists
        </Button>
        <Button
          className="bg-zinc-800 text-white rounded-full px-3 py-2 text-sm"
          onClick={() => setOption("albums")}
        >
          Albums
        </Button>
      </div>
      {renderOption()}
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}
