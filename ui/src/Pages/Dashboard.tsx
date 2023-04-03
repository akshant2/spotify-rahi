import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Player from "../components/Player";
import { Albums } from "../components/Albums";
import { Playlists } from "../components/Playlists";
import { Album, Playlist, API } from "../types";
import Auth from "../utils/Auth";

export default function Dashboard() {
  const [releases, setReleases] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [message, setMessage] = useState<string>();
  const accessToken = Auth();

  const getNewReleases = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch("https://api.spotify.com/v1/browse/new-releases", searchParameters)
      .then((response) => response.json())
      .then((data: API) => {
        setReleases(data.albums.items);
      });
  };
  const getFeaturedPlaylists = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        console.log(data);
        setPlaylists(data.playlists.items);
        setMessage(data.message);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getNewReleases();
      getFeaturedPlaylists();
    }
  }, [accessToken]);

  return (
    <div className="min-h-full bg-black">
      <NavBar />

      <main>
        <div className="h-auto mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-zinc-900">
          <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
          <div className="py-2">
            <h2 className=" text-sm font-bold text-green-500">
              {message ? message : ""}
            </h2>
          </div>
          <Playlists playlist={playlists} n={4} />
        </div>
        <div className="max-w-8xl px-4 py-8 bg-black">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">
            New Releases
          </h2>
          <Albums album={releases} n={10} />
        </div>
      </main>
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}
