import { NavBar } from "../components/NavBar";
import { Playlists } from "../components/Playlists";
import React, { FC, useEffect, useState } from "react";
import { API, Playlist } from "../types";
import { useParams } from "react-router";
import { Auth } from "../utils/Auth";
import { Player } from "../components/Player";

export const CategoryPage: FC = function () {
  const { id } = useParams();
  const accessToken = Auth();
  const [category, setCategory] = useState<string>("");
  const [playlists, setPlaylists] = useState<{
    items: Playlist[];
    message: string | null;
  }>({
    items: [],
    message: null,
  });
  const getCategoriesPlaylists = (token: string): void => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: API) => {
        setPlaylists({
          items: data.playlists.items,
          message: "",
        });
      });
    fetch(
      `https://api.spotify.com/v1/browse/categories/${id}`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.name);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getCategoriesPlaylists(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="min-h-full bg-black">
      <NavBar />

      <main>
        <div className="h-auto mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-zinc-900">
          <h2 className="text-2xl font-bold text-white">{category}</h2>
          <div className="py-2">
            <h2 className=" text-sm font-bold text-green-500">Popular</h2>
          </div>
          <Playlists playlist={playlists.items} endIndex={undefined} />
        </div>
      </main>
      <div className="p-10">
        <Player />
      </div>
    </div>
  );
};
