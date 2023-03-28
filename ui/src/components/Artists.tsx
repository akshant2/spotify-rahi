import React, { FC } from "react";
import { Artist } from "../types";
import { Link } from "react-router-dom";

export const Artists: FC<ArtistType> = ({ artist }) => {
  return (
    <div className="py-4 bg-gray-200 overflow-y-auto h-80 px-10 mt-6 grid grid-cols-5 gap-y-10 gap-x-6">
      {artist.slice(0, 10).map((artist) => (
        <div key={artist.id} className="group relative">
          <Link to={`/artist/${artist.id}`}></Link>
          <div className="bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={artist.images.length > 0 ? artist.images[0].url : ""}
              className="rounded-full h-60 w-60 object-cover object-center"
              alt="Artist Image"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                <a href={`http://localhost:3000/artist/${artist.id}`}>
                  <span
                    aria-hidden="true"
                    className="object-center absolute inset-0"
                  />
                  {artist.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-zinc-500">Artist</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

type ArtistType = { artist: Artist[] };
