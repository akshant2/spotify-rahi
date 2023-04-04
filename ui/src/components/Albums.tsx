import React, { FC } from "react";
import { Album } from "../types";
import { Link } from "react-router-dom";

export const Albums: FC<AlbumType> = function ({ album, n }) {
  return (
    <div className="overflow-y-auto h-auto px-10 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-5 lg:grid-cols-5">
      {album.slice(0, n).map((album, i) => (
        <div key={i} className="group relative">
          <Link to={`/album/${album.id}`}></Link>
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={album.images[0].url}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              alt="Album Image"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                <a href={`${process.env.REACT_APP_DOMAIN}/album/${album.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {album.name}
                </a>
              </h3>
              <p className="mt-1 text-sm font-semibold text-zinc-300">
                {album.artists[0].name}
              </p>
            </div>
            <p className="text-sm font-semibold text-zinc-300">
              {album.release_date.slice(0, 4)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

type AlbumType = { album: Album[]; n: number };
