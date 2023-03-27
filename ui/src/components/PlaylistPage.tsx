import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "./NavBar";
import { PlaylistTracks } from "../types";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { green, red } from "@mui/material/colors";

const client_id = "c01ff52afa434ea490f0081740544b71";
const client_secret = "5b0bb494f9964251be58dcb8f1eba45e";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function PlaylistPage() {
  const [accessToken, setAccessToken] = useState("");
  const { id } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTracks[]>([]);
  const [playlistImage, setPlaylistImage] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState("");
  const [playlistFollowers, setPlaylistFollowers] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    //API access token
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      .then((data) => {
        console.log(data);
        setPlaylistTracks(data.tracks.items);
        setPlaylistImage(data.images[0].url);
        setPlaylistName(data.name);
        setPlaylistInfo(data.description);
        setPlaylistFollowers(formatNumberWithCommas(data.followers.total));
        setOwner(data.owner.display_name);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getPlaylist();
    }
  }, [accessToken]);

  const msToTime = (s: number) => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const min = String(mins).padStart(2, "0");
    const sec = String(secs).padStart(2, "0");
    return min + ":" + sec;
  };

  const formatNumberWithCommas = (num: string) => {
    return num.toLocaleString();
  };

  return (
    <div>
      <NavBar />

      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-15">
        <img className="w-72 h-72" src={playlistImage} alt="Album Image" />
        <div>
          <h3 className="text-xs text-white">Playlist</h3>

          <div className="py-10">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {playlistName}
            </h1>
            <h3 className="py-5 text-sm text-zinc-300">{playlistInfo}</h3>
            <h2 className="py-2 text-sm font-semibold text-white">{`${owner} | ${playlistFollowers} likes`}</h2>
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
        <div className="overflow-x-auto mt-6 bg-gray-200 relative">
          <table className="mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Album
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {playlistTracks.map((track, i) => (
                <tr
                  key={track.track.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4"> {i + 1} </td>

                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
                  >
                    <img
                      className="w-16 h-16"
                      src={track.track.album.images[0].url}
                      alt="Album Image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {track.track.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {track.track.artists[0].name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{track.track.album.name}</td>
                  <td className="px-6 py-4">
                    {msToTime(track.track.duration_ms)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
