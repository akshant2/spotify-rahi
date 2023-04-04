import React, { FC } from "react";
import { Playlist } from "../types";
import { Link } from "react-router-dom";

export const Playlists: FC<PlaylistType> = ({
  playlist,
  startIndex,
  endIndex,
}) => {
  return (
    <div className="p-2 h-auto mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-5 lg:grid-cols-5">
      {playlist.slice(startIndex, endIndex).map((playlist, i) => (
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
                {playlist.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type PlaylistType = {
  playlist: Playlist[];
  startIndex: number;
  endIndex: number;
};
