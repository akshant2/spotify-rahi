import React, { FC, useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Auth } from "../utils/Auth";
import { NavBar } from "../components/NavBar";
import { Playlists } from "../components/Playlists";
import { Tracks } from "../components/Tracks";
import { Albums } from "../components/Albums";
import { Artists } from "../components/Artists";
import { green } from "@mui/material/colors";
import { Artist, Track, Album, Playlist, API, Category } from "../types";
import { Categories } from "../components/Categories";
import { Player } from "../components/Player";

export const SearchBar: FC = function () {
  const accessToken = Auth();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
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

  const searchSpotify = (token: string | null): void => {
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
        console.log(data);
        setResults({
          tracks: data.tracks.items,
          artists: data.artists.items,
          albums: data.albums.items,
          playlists: data.playlists.items,
        });
      });
  };
  const getCategories = (token: string): void => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/browse/categories?country=US&offset=0&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        setCategories(data.categories.items);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getCategories(accessToken);
    }
  }, [accessToken]);

  const render = (): JSX.Element => {
    if (display) {
      return (
        <div>
          <div className="p-5 bg-black">
            <h2 className="text-2xl font-bold text-white">Top Results</h2>
            <div className="">
              <Artists artist={results.artists} endIndex={5} />
            </div>
          </div>

          <div className="h-auto bg-gray-200 relative">
            <Tracks track={results.tracks} albumImage="" endIndex={5} />
          </div>

          <div className="bg-zinc-900 mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 ">
            <div className="h-auto overflow-x-auto relative">
              <h2 className="p-2 text-2xl font-bold text-white">Playlists</h2>
              <Playlists playlist={results.playlists} endIndex={5} />
            </div>
          </div>
          <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-black">
            <h2 className="text-2xl font-bold text-white">Albums</h2>
            <div className="inline-flex">
              <Albums album={results.albums} endIndex={5} />
            </div>
          </div>
          <div className="p-10">
            <Player />
          </div>
        </div>
      );
    } else
      return (
        <div className="p-3 h-auto mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-black">
          <h2 className="p-2 text-2xl font-bold text-white">
            Browse Categories
          </h2>
          <Categories category={categories} />
        </div>
      );
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
              <IconButton
                onClick={(): void => {
                  searchSpotify(accessToken);
                  setDisplay(true);
                }}
              >
                <SearchOutlined sx={{ color: green[50] }} />
              </IconButton>
            ),
          }}
          onKeyPress={(e): void => {
            if (e.key === "Enter") {
              searchSpotify(accessToken);
              setDisplay(true);
            }
          }}
          onChange={(e): void => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      {render()}
    </div>
  );
};
