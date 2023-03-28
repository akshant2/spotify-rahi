import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Player from "./Player";
import { Albums } from "../styles/Albums";
import { Link } from "react-router-dom";
import { Album, Playlist } from "../types/types";
import Auth from "./Auth";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Dashboard() {
  const [releases, setReleases] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [message, setMessage] = useState("");

  const accessToken = Auth();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getNewReleases = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch("https://api.spotify.com/v1/browse/new-releases", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReleases(data.albums.items);
      });
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getFeaturedPlaylists = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlaylists(data.playlists.items);
        setMessage(data.message);
      });
  };
  useEffect(() => {
    if (accessToken) {
      getNewReleases();
      getFeaturedPlaylists();
    }
  }, [accessToken]);

  return (
    <div className="min-h-full bg-black">
      <NavBar />

      <main>
        <div className="mx-auto max-w-8xl py-5 sm:px-6 lg:px-8 bg-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Playlists
          </h2>
          <div>
            <h2 className=" text-sm font-semibold text-gray-900">{message}</h2>
          </div>
          <div className="py-2 h-100 grid grid-cols-4 gap-y-10 gap-x-6">
            {playlists.slice(0, 4).map((playlist, i) => (
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
                      className="text-sm font-semibold no-underline text-zinc-900"
                      href={`http://localhost:3000/playlist/${playlist.id}`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 no-underline"
                      />
                      {playlist.description}
                    </a>

                    <p className="mt-1 text-sm text-green-600">
                      {playlist.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-8xl px-4 py-8 bg-black">
          <h2 className="px-4 py-2 text-2xl font-bold text-white">
            New Releases
          </h2>
          <Albums album={releases} />
        </div>
      </main>
      <div className="p-12">
        <Player />
      </div>
    </div>
  );
}

/*          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
              {releases.map((release, i) => (
                <div key={i} className="group relative">
                  <div className="relative overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={release.images[0].url}
                      className="h-full w-full object-cover object-center"
                      alt="NewRelease Image"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-900">
                        <a href={release.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {release.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {release.artists[0].name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
*/
