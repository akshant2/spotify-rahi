import React, { FC } from "react";
import { Track } from "../types";
import ExplicitOutlinedIcon from "@mui/icons-material/Explicit";
import msToTime from "../utils/msToTime";
import ExplicitIcon from "@mui/icons-material/Explicit";

export const Tracks: FC<TrackType> = ({ track, albumImage }) => {
  if (albumImage == "") {
    return (
      <table className="mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Songs
            </th>
            <th scope="col" className="px-6 py-3">
              Album
            </th>
            <th scope="col" className="px-6 py-3">
              Release Date
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {track.map((track, i) => (
            <tr
              key={i}
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
                  <div className="text-base font-semibold">{track.name}</div>
                  <div className="flex font-normal text-gray-500">
                    {track.explicit ? <ExplicitOutlinedIcon /> : ""}
                    <p className="mt-0.5 font-normal text-gray-500">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{track.album.name}</td>
              <td className="px-6 py-4">
                {track.album.release_date.slice(0, 4)}
              </td>
              <td className="px-6 py-4">{msToTime(track.duration_ms)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
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
          {track.map((track) => (
            <tr
              key={track.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4"> {track.track_number} </td>

              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
              >
                <img className="w-16 h-16" src={albumImage} alt="Album Image" />
                <div className="pl-3">
                  <div className="text-base font-semibold">{track.name}</div>
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
    );
  }
};

type TrackType = { track: Track[]; albumImage: string };
