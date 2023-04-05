import React, { useEffect, useState } from "react";
import { Token } from "../types";

const client_id = `${process.env.REACT_APP_CLIENT_ID}`;
const client_secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
export const Auth: () => string | null = function () {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data: Token) => {
        setAccessToken(data.access_token);
      });
  }, []);

  return accessToken;
};
