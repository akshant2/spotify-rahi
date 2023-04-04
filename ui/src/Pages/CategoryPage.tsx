import NavBar from "../components/NavBar";
import { Playlists } from "../components/Playlists";
import React, { useEffect, useState } from "react";
import { API, Playlist } from "../types";
import { useParams } from "react-router";
import Auth from "../utils/Auth";

export default function CategoryPage() {
  const { id } = useParams();
  const accessToken = Auth();
  const [playlists, setPlaylists] = useState<{
    items: Playlist[];
    message: string;
  }>({
    items: [],
    message: "",
  });
  const getCategoriesPlaylists = (token: string) => {
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
          <h2 className="text-2xl font-bold text-white">Popular</h2>
          <div className="py-2">
            <h2 className=" text-sm font-bold text-green-500">
              Category Message
            </h2>
          </div>
          <Playlists playlist={playlists.items} startIndex={0} endIndex={5} />
        </div>
        <div className="max-w-8xl px-4 py-8 bg-black">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">
            Category Message
          </h2>
          <Playlists playlist={playlists.items} startIndex={5} endIndex={15} />
        </div>
      </main>
    </div>
  );
}
