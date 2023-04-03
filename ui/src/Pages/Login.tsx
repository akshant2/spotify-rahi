import React from "react";

const AUTH_URL = process.env.REACT_APP_AUTH_URL;
export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="Spotify Logo"
          />
          <h2 className="mt-6 py-10 text-center text-2xl font-semibold tracking-tight text-gray-200">
            Sign in to your Spotify account
          </h2>

          <a
            href={AUTH_URL}
            type="submit"
            className="flex w-auto justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white hover:bg-green-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}