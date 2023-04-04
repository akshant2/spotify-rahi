import React, { FC } from "react";
import { Artist } from "../types";
import { Link } from "react-router-dom";

export const Artists: FC<ArtistType> = function ({ artist, n }) {
  return (
    <div className=" py-4 bg-zinc-900 h-auto px-10 mt-6 grid grid-cols-5 gap-y-10 gap-x-6">
      {artist.slice(0, n).map((artist) => (
        <div key={artist.id} className="group relative">
          <Link to={`/artist/${artist.id}`}></Link>
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-zinc-900 group-hover:opacity-75 lg:aspect-none">
            <img
              src={artist.images.length > 0 ? artist.images[0].url : ""}
              className="rounded-md max-h-60 w-60 object-cover object-center"
              alt="Artist Image"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-1xl font-bold text-white">
                <a href={`${process.env.REACT_APP_DOMAIN}/artist/${artist.id}`}>
                  <span
                    aria-hidden="true"
                    className="object-center absolute inset-0"
                  />
                  {artist.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-zinc-400">Artist</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type ArtistType = { artist: Artist[]; n: number };
