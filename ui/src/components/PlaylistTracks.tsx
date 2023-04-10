import React, { FC } from "react";
import { Track } from "../types";
import { msToTime } from "../utils/msToTime";
import { TrackView } from "./TrackView";
import ExplicitIcon from "@mui/icons-material/Explicit";

export const PlaylistTracks: FC<PlaylistTrackType> = ({ playlistTrack }) => {
  return (
    <div className="overflow-x-auto bg-gray-200 relative">
      <table className="mx-auto w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
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
            <th scope="col" className="px-6 py-3">
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          {playlistTrack.map((track, i) => (
            <tr key={i} className="bg-white border-b hover:bg-zinc-50">
              <td className="px-6 py-4"> {i + 1} </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 overflow-wrap"
              >
                <img
                  className="w-20 h-20"
                  src={track.track ? track.track.album.images[0].url : ""}
                  alt="Album Image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {track.track.name}
                  </div>
                  <div className="flex font-normal text-gray-500">
                    {track.track.explicit ? <ExplicitIcon /> : ""}
                    <div className="flex mt-0.5">
                      {track.track.artists
                        .map((artist) => `${artist.name}`)
                        .join(", ")}
                    </div>
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
              <td className="px-6 py-4 text-gray-900">
                {
                  <TrackView
                    track={track.track}
                    album={track.track.album}
                    artists={track.track.artists}
                    explicit={false}
                    name={track.track.name}
                    id={track.track.id}
                    image={track.track.album.images[0].url}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type PlaylistTrackType = { playlistTrack: Track[] };
