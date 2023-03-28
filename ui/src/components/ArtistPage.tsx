import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "./NavBar";
import { Artist, Track } from "../types";
import ExplicitIcon from "@mui/icons-material/Explicit";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import { green, red } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Auth from "./Auth";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function AlbumPage() {
  const accessToken = Auth();
  const { id } = useParams();
  const [artistImage, setArtistImage] = useState("");
  const [artistName, setArtistName] = useState("");
  const [followers, setFollowers] = useState("");
  const [type, setType] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        setType(data.type);
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
      .then((data) => {
        console.log(data);
        setTracks(data.tracks);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getArtist();
      getArtistTracks();
    }
  }, [accessToken]);

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
            <h2 className="py-7 text-1xl font-semibold text-white">
              {followers}
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
              {tracks.map((track, i) => (
                <tr
                  key={track.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4"> {i + 1} </td>

                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
                  >
                    <img
                      className="w-16 h-16"
                      src={track.album.images[0].url}
                      alt="Track Image"
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
                  <td className="px-6 py-4"> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
