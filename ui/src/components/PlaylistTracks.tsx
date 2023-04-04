import React, { FC } from "react";
import { Track } from "../types";
import msToTime from "../utils/msToTime";

export const PlaylistTracks: FC<PlaylistTrackType> = ({ playlistTrack }) => {
  return (
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
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {playlistTrack.map((track, i) => (
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
                  className="w-20 h-20"
                  src={track.track ? track.track.album.images[0].url : ""}
                  alt="Album Image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {track.track ? track.track.name : "null"}
                  </div>
                  <div className="font-normal text-gray-500">
                    {track.track ? track.track.artists[0].name : "null"}
                  </div>
                </div>
              </th>
              <td className="text-md px-6 py-4">
                {track.track ? track.track.album.name : "null"}
              </td>
              <td className="text-md px-6 py-4">
                {track.added_at ? track.added_at.substring(0, 10) : "null"}
              </td>
              <td className="px-6 py-4">
                {msToTime(track.track ? track.track.duration_ms : 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type PlaylistTrackType = { playlistTrack: Track[] };
