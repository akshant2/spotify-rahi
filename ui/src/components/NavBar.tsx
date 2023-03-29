import React from "react";
export default function NavBar() {
  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-items">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                  alt="Spotify Logo"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                  alt="Spotify Logo"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="http://localhost:3000/dashboard"
                    className="bg-zinc-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="http://localhost:3000/search"
                    className="bg-zinc-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Search
                  </a>
                  <a
                    href="http://localhost:3000/library"
                    className="bg-zinc-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    My Library
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
