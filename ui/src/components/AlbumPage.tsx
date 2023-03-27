import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "./NavBar";
import { Track, Album } from "../types";
import ExplicitIcon from "@mui/icons-material/Explicit";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { green, red } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const client_id = "c01ff52afa434ea490f0081740544b71";
const client_secret = "5b0bb494f9964251be58dcb8f1eba45e";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function AlbumPage() {
  const [accessToken, setAccessToken] = useState("");
  const { id } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [albumTracks, setAlbumTracks] = useState<Track[]>([]);
  const [albumImage, setAlbumImage] = useState("");
  const [albumArtist, setAlbumArtist] = useState("");
  const [albumDate, setAlbumDate] = useState("");
  const [total, setTotal] = useState("");

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
      .then((data) => {
        console.log(data);
        setAccessToken(data.access_token);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      .then((data) => {
        console.log(data);
        setAlbumTracks(data.tracks.items);
        setAlbumImage(data.images[0].url);
        setAlbumName(data.name);
        setAlbumArtist(data.artists[0].name);
        setAlbumDate(data.release_date);
        setTotal(data.total_tracks);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getAlbum();
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

  return (
    <div>
      <NavBar />
      <div className="bg-black flex space-x-5 mx-auto max-w-8xl py-6 px-4">
        <img className="w-72 h-72" src={albumImage} alt="Album Image" />
        <div>
          <h3 className="text-xs text-white">Album</h3>
          <div className="py-12">
            <h1 className="text-7xl font-bold tracking-tight text-white">
              {albumName}
            </h1>
            <h2 className="py-7 text-1xl font-semibold text-white">
              {`${albumArtist} | ${albumDate.slice(0, 4)} | ${total} songs`}
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
        <div className="overflow-x-auto bg-gray-200 relative">
          <table className="mx-auto w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Songs
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {albumTracks.map((track) => (
                <tr
                  key={track.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4"> {track.track_number} </td>

                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
                  >
                    <img
                      className="w-16 h-16"
                      src={albumImage}
                      alt="Album Image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {track.name}
                      </div>
                      <div className="flex font-normal text-gray-500">
                        {track.explicit ? <ExplicitIcon /> : ""}
                        <p className="mt-0.5 text-sm text-zinc-400">
                          {track.artists[0].name}
                        </p>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4"> {msToTime(track.duration_ms)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
