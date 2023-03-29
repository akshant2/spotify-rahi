import React, { FC } from "react";
import { Playlist } from "../types";
import { Link } from "react-router-dom";

export const Playlists: FC<PlaylistType> = ({ playlist, n }) => {
  return (
    <div className="p-2 h-auto grid grid-cols-4 gap-y-10 gap-x-6">
      {playlist.slice(0, n).map((playlist, i) => (
        <div key={i} className="group relative">
          <Link to={`/playlist/${playlist.id}`}></Link>
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img
              src={playlist.images[0].url}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              alt="Playlist Image"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <a
                className="text-sm font-bold no-underline text-white"
                href={`http://localhost:3000/playlist/${playlist.id}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 no-underline"
                />
                {playlist.description}
              </a>

              <p className="mt-1 text-sm text-gray-100">{playlist.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type PlaylistType = { playlist: Playlist[]; n: number };
