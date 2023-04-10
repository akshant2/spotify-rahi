import React, { FC, useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Auth } from "../utils/Auth";
import LinearProgress from "@mui/material/LinearProgress";
import { green } from "@mui/material/colors";

export const Player: FC = function () {
  const accessToken = Auth();
  const [trackData, setTrackData] = useState();

  const getTrack = (token: string): void => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://api.spotify.com/v1/tracks/`, searchParameters)
      .then((response) => response.json())
      .then((data) => {});
  };

  useEffect(() => {
    if (accessToken) {
      getTrack(accessToken);
    }
  }, [accessToken]);

  return (
    <div>
      <footer className="fixed bottom-0 left-0 w-full p-3 bg-zinc-900 border-t border-zinc-800 shadow md:flex md:items-center md:justify-between">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="hidden h-8 w-auto lg:block"
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="Spotify Logo"
          />
          <div className="pl-3">
            <div className="text-sm font-semibold text-white">Track Name</div>
            <div className=" text-xs font-normal text-zinc-400">
              Track Artist
            </div>
          </div>
        </div>

        <div>
          <div className="py-1 bg-zinc-900 text-slate-500  rounded-b-xl flex items-center">
            <div className="px-5 flex-auto flex items-center justify-evenly">
              <button
                type="button"
                className="bg-zinc-800 rounded-md hidden sm:block lg:hidden xl:block"
                aria-label="Previous"
              >
                <SkipPreviousIcon />
              </button>
            </div>

            <button
              type="button"
              className="bg-zinc-200 text-zinc-800 flex-none mx-auto w-7 h-7 rounded-md flex items-center justify-center"
              aria-label="Pause"
            >
              <PauseIcon />
            </button>

            <div className="px-5 flex-auto flex items-center justify-evenly">
              <button
                type="button"
                className="bg-zinc-800 rounded-md hidden sm:block lg:hidden xl:block"
                aria-label="Next"
              >
                <SkipNextIcon />
              </button>
            </div>
          </div>

          <div className="flex">
            <div className=" justify-between text-sm leading-6 font-medium tabular-nums px-2">
              <h2 className="text-zinc-500 ">0:00</h2>
            </div>
            <div className="w-full mt-2.5 ">
              <LinearProgress
                variant="determinate"
                value={66}
                sx={{ color: green[500] }}
              />
            </div>
            <div className="justify-between text-sm leading-6 font-medium tabular-nums px-2 ">
              <h2 className="text-zinc-500 ">0:00</h2>
            </div>
          </div>
        </div>

        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          Not Playing
        </ul>
      </footer>
    </div>
  );
};
