import React, { FC, useState } from "react";
import { Artist } from "../types";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { green } from "@mui/material/colors";
export const Artists: FC<ArtistType> = function ({ artist, endIndex }) {
  const [expand, setExpand] = useState(false);

  if (expand) {
    endIndex = undefined;
  } else {
    endIndex = 5;
  }

  return (
    <div className=" py-4 bg-zinc-900 h-auto px-10 mt-6 grid grid-cols-5 gap-y-10 gap-x-6">
      {artist.slice(0, endIndex).map((artist, i) => (
        <div key={i} className="group relative">
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
              <h3 className="mt-1 text-sm text-zinc-400">
                <p className="mt-1">{`Rating: ${
                  artist.popularity ? artist.popularity : "N/A"
                }`}</p>
              </h3>
            </div>
            <p className="text-sm font-medium text-white">Artist</p>
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

type ArtistType = { artist: Artist[]; endIndex: number | undefined };
