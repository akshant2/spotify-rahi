import React, { FC, useState } from "react";
import { Track } from "../types";
import msToTime from "../utils/msToTime";
import ExplicitIcon from "@mui/icons-material/Explicit";
import { TrackView } from "./TrackView";

export const Tracks: FC<TrackType> = ({ track, albumImage }) => {
  if (albumImage == "") {
    return (
      <div>
        <table className="mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
              <th scope="col" className="px-6 py-3">
                Info
              </th>
            </tr>
          </thead>
          <tbody>
            {track.map((track, i) => (
              <tr key={i} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">{i + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
                >
                  <img
                    className="w-20 h-20"
                    src={track.album.images[0].url}
                    alt="Track Image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{track.name}</div>
                    <div className="flex mt-1 font-normal text-gray-500">
                      {track.explicit ? <ExplicitIcon /> : ""}
                      <div className="flex mt-0.5 px-1 ">
                        {track.artists
                          .map((artist) => `${artist.name}`)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{track.album.name}</td>
                <td className="px-6 py-4">
                  {track.album.release_date.slice(0, 4)}
                </td>
                <td className="px-6 py-4">{msToTime(track.duration_ms)}</td>
                <td className="px-6 py-4 text-gray-900">
                  <TrackView
                    track={track}
                    album={track.album}
                    artists={track.artists}
                    explicit={track.explicit}
                    name={track.name}
                    id={track.id}
                    image={""}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <table className="mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
            <th scope="col" className="px-6 py-3">
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          {track.map((track, i) => (
            <tr key={track.id} className="bg-white border-b hover:bg-gray-100">
              <td className="px-6 py-4"> {i + 1} </td>

              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 overflow-wrap dark:text-white"
              >
                <img className="w-20 h-20" src={albumImage} alt="Album Image" />
                <div className="pl-3">
                  <div className="text-base font-semibold">{track.name}</div>
                  <div className="flex font-normal text-gray-500">
                    {track.explicit ? <ExplicitIcon /> : ""}
                    <div className="flex mt-0.5">
                      {track.artists
                        .map((artist) => `${artist.name}`)
                        .join(", ")}
                    </div>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4"> {msToTime(track.duration_ms)} </td>
              <td className="px-6 py-4 text-gray-900">
                <TrackView
                  track={track}
                  album={track.album}
                  artists={track.artists}
                  explicit={track.explicit}
                  name={track.name}
                  id={track.id}
                  image={albumImage}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
type TrackType = { track: Track[]; albumImage: string };
