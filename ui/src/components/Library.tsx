import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const client_id = "c01ff52afa434ea490f0081740544b71";
const client_secret = "5b0bb494f9964251be58dcb8f1eba45e";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Library() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    //API access token
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    getUserPlaylists();
  }, [accessToken]);

  return (
    <div>
      <NavBar />
    </div>
  );
}
