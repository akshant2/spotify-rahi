import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavBar } from "../components/NavBar";
import { Tracks } from "../components/Tracks";
import { Auth } from "../utils/Auth";
import { Track, Album } from "../types";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { green, red } from "@mui/material/colors";

export const AlbumPage: FC = function () {
  const { id } = useParams();
  const accessToken = Auth();
  const [album, setAlbum] = useState<{
    name: string;
    image: string;
    artist: string;
    date: string;
    total: string;
    tracks: Track[];
  }>({
    name: "",
    image: "",
    artist: "",
    date: "",
    total: "",
    tracks: [],
  });

  const getAlbum = (token: string) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://api.spotify.com/v1/albums/${id}?market=US`, searchParameters)
      .then((response) => response.json())
      .then((data: Album) => {
        setAlbum({
          artist: data.artists[0].name,
          date: data.release_date,
          image: data.images[0].url,
          name: data.name,
          total: data.total_tracks,
          tracks: data.tracks.items,
        });
      });
  };

  useEffect(() => {
    if (accessToken) {
      getAlbum(accessToken);
    }
  }, [accessToken]);

  return (
    <div>
      <NavBar />
      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-15">
        <img className="w-72 h-72" src={album.image} alt="Album Image" />
        <div>
          <h3 className="text-sm font-semibold text-green-400">Album</h3>
          <div className="py-10">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {album.name}
            </h1>
            <div className="flex">
              <h2 className="py-3 text-1xl font-semibold text-white">
                {album.artist}
              </h2>
              <h2 className="py-3 px-2 text-1xl text-white">
                {album.date.slice(0, 4)}
              </h2>
              <h2 className="py-3 text-1xl text-white">{`${album.total} songs`}</h2>
            </div>

            <div>
              <PlayCircleRoundedIcon sx={{ color: green[500], fontSize: 50 }} />
              <FavoriteBorderOutlinedIcon
                sx={{ color: red[500], fontSize: 50, m: 2 }}
              />
              <h2 className=" text-xs text-white">copyrights</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tracks track={album.tracks} albumImage={album.image} />
      </div>
      <div className="p-5 bg-zinc-900">
        <h2 className="p-2 text-2xl font-semibold text-white">
          {"Related Albums"}
        </h2>
      </div>
    </div>
  );
};
