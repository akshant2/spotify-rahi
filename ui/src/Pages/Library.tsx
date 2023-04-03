import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Auth from "../utils/Auth";

export default function Library() {
  const accessToken = Auth();

  const getUserPlaylists = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch("https://api.spotify.com/v1/me/playlists", searchParameters)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getUserPlaylists();
    }
  }, [accessToken]);

  return (
    <div>
      <NavBar />
    </div>
  );
}
