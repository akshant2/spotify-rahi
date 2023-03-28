import React, { FC } from "react";
import { Artist, Track } from "../types/types";
import ExplicitOutlinedIcon from "@mui/icons-material/Explicit";
//import {msToTime} from "./SearchBar"

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

export const Tracks: FC<TrackType> = ({ track }) => {
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
};

type TrackType = { track: Track[] };
