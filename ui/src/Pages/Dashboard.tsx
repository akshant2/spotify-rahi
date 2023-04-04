import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Player from "../components/Player";
import { Albums } from "../components/Albums";
import { Categories } from "../components/Categories";
import { Playlists } from "../components/Playlists";
import { Album, Playlist, API, Category } from "../types";
import Auth from "../utils/Auth";

export default function Dashboard() {
  const accessToken = Auth();
  const [releases, setReleases] = useState<Album[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [playlists, setPlaylists] = useState<{
    items: Playlist[];
    message: string;
  }>({
    items: [],
    message: "",
  });

  const getNewReleases = (token: string) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch("https://api.spotify.com/v1/browse/new-releases", searchParameters)
      .then((response) => response.json())
      .then((data: API) => {
        setReleases(data.albums.items);
      });
  };
  const getFeaturedPlaylists = (token: string) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        setPlaylists({
          items: data.playlists.items,
          message: data.message,
        });
      });
  };
  const getCategories = (token: string) => {
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
      getNewReleases(accessToken);
      getFeaturedPlaylists(accessToken);
      getCategories(accessToken);
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
              {playlists.message ? playlists.message : ""}
            </h2>
          </div>
          <Playlists playlist={playlists.items} startIndex={0} endIndex={5} />
        </div>
        <div className="max-w-8xl px-4 py-8 bg-black">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">
            New Releases
          </h2>
          <Albums album={releases} n={5} />
        </div>
        <div className="h-auto mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-zinc-900">
          <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
          <Categories category={categories} />
        </div>
      </main>
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}
