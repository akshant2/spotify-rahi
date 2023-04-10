import React, { FC, useState } from "react";
import { Playlist } from "../types";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { green } from "@mui/material/colors";
export const Playlists: FC<PlaylistType> = ({ playlist, endIndex }) => {
  const [expand, setExpand] = useState(false);

  if (expand) {
    endIndex = undefined;
  } else {
    endIndex = 5;
  }

  return (
    <div className="p-2 h-auto mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-5 lg:grid-cols-5">
      {playlist.slice(0, endIndex).map((playlist, i) => (
        <div key={i} className="group relative">
          <Link to={`/playlist/${playlist.id}`}></Link>
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={playlist.images[0].url}
              className="h-full w-full object-cover object-center"
              alt="Playlist Image"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <a
                className="text-sm font-bold no-underline text-white"
                href={`${process.env.REACT_APP_DOMAIN}/playlist/${playlist.id}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 no-underline"
                />
                {playlist.name}
              </a>

              <p className="mt-1 text-sm text-gray-100">
                {playlist.description.indexOf(".") > 0
                  ? playlist.description.substring(
                      0,
                      playlist.description.indexOf(".") + 1
                    )
                  : playlist.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      <a
        className="bg-zinc-900 text-white rounded-md text-sm font-medium"
        onClick={(): void => {
          if (expand) {
            setExpand(false);
          } else {
            setExpand(true);
          }
        }}
      >
        {expand ? (
          <h1 className="text-semibold ">
            Show Less <ExpandLessIcon sx={{ color: green[500] }} />
          </h1>
        ) : (
          <h1 className="text-semibold">
            Show More
            <ExpandMoreIcon sx={{ color: green[500] }} />
          </h1>
        )}
      </a>
    </div>
  );
};

type PlaylistType = {
  playlist: Playlist[];
  endIndex: number | undefined;
};
