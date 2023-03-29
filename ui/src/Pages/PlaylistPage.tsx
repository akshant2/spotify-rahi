import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import { Playlist, Track } from "../types";
import { PlaylistTracks } from "../components/PlaylistTracks";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { green, red } from "@mui/material/colors";
import Auth from "../utils/Auth";

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [playlistImage, setPlaylistImage] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState("");
  const [playlistFollowers, setPlaylistFollowers] = useState("");
  const [owner, setOwner] = useState("");
  const accessToken = Auth();

  const getPlaylist = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/playlists/${id}?market=US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: Playlist) => {
        console.log(data);
        setPlaylistTracks(data.tracks.items);
        setPlaylistImage(data.images[0].url);
        setPlaylistName(data.name);
        setPlaylistInfo(data.description);
        setPlaylistFollowers(data.followers.total);
        setOwner(data.owner.display_name);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getPlaylist();
    }
  }, [accessToken]);

  return (
    <div>
      <NavBar />

      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-15">
        <img className="w-72 h-72" src={playlistImage} alt="Album Image" />
        <div>
          <h3 className="text-sm text-white">Playlist</h3>

          <div className="py-10">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {playlistName}
            </h1>
            <h3 className="py-5 text-sm text-zinc-300">{playlistInfo}</h3>
            <h2 className="py-2 text-sm font-semibold text-white">{`${owner} | ${playlistFollowers.toLocaleString()} likes`}</h2>
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
    </div>
  );
}
