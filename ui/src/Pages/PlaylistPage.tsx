import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavBar } from "../components/NavBar";
import { Playlist, Track } from "../types";
import { PlaylistTracks } from "../components/PlaylistTracks";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { green, red } from "@mui/material/colors";
import { Auth } from "../utils/Auth";
import { Player } from "../components/Player";

export const PlaylistPage: FC = function () {
  const { id } = useParams();
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState({
    name: "",
    image: "",
    description: "",
    followers: "",
    owner: "",
  });
  const accessToken = Auth();

  const getPlaylist = (token: string): void => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/playlists/${id}?market=US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: Playlist) => {
        console.log(data);
        setPlaylist({
          name: data.name,
          image: data.images[0].url,
          description: data.description,
          followers: data.followers.total,
          owner: data.owner.display_name,
        });
        setPlaylistTracks(data.tracks.items);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getPlaylist(accessToken);
    }
  }, [accessToken]);

  return (
    <div>
      <NavBar />

      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-15">
        <img className="w-72 h-72" src={playlist.image} alt=":Playlist Image" />
        <div>
          <h3 className="text-sm font-semibold text-green-400">Playlist</h3>
          <div className="py-10">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {playlist.name}
            </h1>
            <h3 className="py-5 text-md text-zinc-300">
              {playlist.description}
            </h3>
            <div className="flex">
              <h2 className="py-2 text-sm font-semibold text-white">
                {playlist.owner}
              </h2>
              <h2 className="py-2 px-2 text-sm text-white">{`${playlist.followers.toLocaleString()} likes`}</h2>
              <h2 className="py-2 text-sm text-white">{`${playlistTracks.length} songs`}</h2>
            </div>

            <div>
              <PlayCircleRoundedIcon sx={{ color: green[500], fontSize: 50 }} />
              <FavoriteBorderOutlinedIcon
                sx={{ color: red[500], fontSize: 50, m: 2 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <PlaylistTracks playlistTrack={playlistTracks} />
      </div>
      <div className="p-10">
        <Player />
      </div>
    </div>
  );
};
