import React, { FC, useState } from "react";
import { Track } from "../types";
import { msToTime } from "../utils/msToTime";
import ExplicitIcon from "@mui/icons-material/Explicit";
import { TrackView } from "./TrackView";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export const Tracks: FC<TrackType> = ({ track, albumImage, endIndex }) => {
  const [expand, setExpand] = useState(false);

  if (expand) {
    endIndex = undefined;
  } else {
    endIndex = 5;
  }

  return (
    <div>
      <table className="mx-auto w-full text-sm text-left text-gray-500 ">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100 ">
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
          {track.slice(0, endIndex).map((track, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-100">
              <td className="px-6 py-4">{i + 1}</td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 overflow-wrap"
              >
                <img
                  className="w-20 h-20"
                  src={
                    albumImage != "" ? albumImage : track.album.images[0].url
                  }
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
              <td className="px-6 py-4">
                {track.album ? track.album.name : ""}
              </td>
              <td className="px-6 py-4">
                {track.album ? track.album.release_date.slice(0, 4) : ""}
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

      <a
        className="p-2 text-gray-900 rounded-md text-sm font-medium"
        onClick={(): void => {
          if (expand) {
            setExpand(false);
          } else {
            setExpand(true);
          }
        }}
      >
        {expand ? (
          <h1 className="px-5 text-semibold text-gray-900 ">
            Show Less
            <ExpandLessIcon sx={{ color: green[500], fontSize: 35 }} />
          </h1>
        ) : (
          <h1 className="px-5 text-semibold text-gray-900">
            Show More
            <ExpandMoreIcon sx={{ color: green[500], fontSize: 35 }} />
          </h1>
        )}
      </a>
    </div>
  );
};
type TrackType = {
  track: Track[];
  albumImage: string;
  endIndex: number | undefined;
};
