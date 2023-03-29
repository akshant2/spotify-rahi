import React from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function Player() {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-3 bg-zinc-900 border-t border-gray-200 shadow md:flex md:items-center md:justify-between">
      <div className="flex flex-shrink-0 items-center">
        <img
          className="hidden h-8 w-auto lg:block"
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
          alt="Spotify Logo"
        />
        <div className="pl-3">
          <div className="text-sm font-semibold text-white">Track Name</div>
          <div className=" text-xs font-normal text-zinc-400">Track Artist</div>
        </div>
      </div>

      <div>
        <div className="py-1 bg-zinc-900 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
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

        <div>
          <div className="relative p-2">
            <div className="w-100 bg-zinc-700 rounded-full overflow-hidden">
              <div className="bg-green-600 w-1/2 h-2"></div>
            </div>
          </div>

          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <h2 className="text-zinc-500 ">0:00</h2>
            <h2 className="text-zinc-500 ">0:00</h2>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        hello
      </ul>
    </footer>
  );
}
