import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import { Track } from "../types";
import { Tracks } from "../components/Tracks";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { green, red } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Auth from "../utils/Auth";

export default function AlbumPage() {
  const accessToken = Auth();
  const { id } = useParams();
  const [artistImage, setArtistImage] = useState("");
  const [artistName, setArtistName] = useState("");
  const [followers, setFollowers] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  const getArtist = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(`https://api.spotify.com/v1/artists/${id}`, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtistImage(data.images[0].url);
        setArtistName(data.name);
        setFollowers(data.followers.total);
      });
  };

  const getArtistTracks = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data: Track) => {
        setTracks(data.tracks);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getArtist();
      getArtistTracks();
    }
  }, [accessToken]);

  const formatNumberWithCommas = (num: string) => {
    return num.toLocaleString();
  };

  return (
    <div>
      <NavBar />
      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4">
        <img
          className="h-72 w-72 rounded-md"
          src={artistImage}
          alt="Album Image"
        />
        <div>
          <h3 className="text-sm text-white">Artist</h3>
          <div className="py-12">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {artistName}
            </h1>
            <h2 className="py-3 text-1xl font-semibold text-white">
              {`${formatNumberWithCommas(followers)} monthly listeners`}
            </h2>
            <div>
              <PlayCircleRoundedIcon
                style={{ color: green[500], fontSize: 50 }}
              />
              <FavoriteBorderOutlinedIcon
                style={{ color: red[500], fontSize: 50 }}
                sx={{ m: 2 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tracks track={tracks} albumImage="" />
      </div>
    </div>
  );
}
