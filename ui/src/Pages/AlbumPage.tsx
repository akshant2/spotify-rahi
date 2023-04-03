import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import { Tracks } from "../components/Tracks";
import { Track, Album } from "../types";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { green, red } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Auth from "../utils/Auth";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState({
    name: "",
    image: "",
    artist: "",
    date: "",
    total: "",
  });
  const [albumTracks, setAlbumTracks] = useState<Track[]>([]);
  const accessToken = Auth();

  const getAlbum = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(`https://api.spotify.com/v1/albums/${id}?market=US`, searchParameters)
      .then((response) => response.json())
      .then((data: Album) => {
        setAlbumTracks(data.tracks.items);
        setAlbum({
          name: data.name,
          image: data.images[0].url,
          artist: data.artists[0].name,
          date: data.release_date,
          total: data.total_tracks,
        });
      });
  };

  useEffect(() => {
    if (accessToken) {
      getAlbum();
    }
  }, [accessToken]);

  return (
    <div>
      <NavBar />
      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4">
        <img className="w-72 h-72" src={album.image} alt="Album Image" />
        <div>
          <h3 className="text-sm text-white">Album</h3>
          <div className="py-12">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {album.name}
            </h1>
            <h2 className="py-3 text-1xl font-semibold text-white">
              {`${album.artist}  |  ${album.date.slice(0, 4)}  |  ${
                album.total
              } songs`}
            </h2>

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
        <div className="overflow-x-auto bg-gray-200 relative">
          <Tracks track={albumTracks} albumImage={album.image} />
        </div>
      </div>
    </div>
  );
}
