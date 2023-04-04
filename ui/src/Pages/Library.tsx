import React, { MouseEventHandler, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Auth from "../utils/Auth";
import { Album } from "../types";
import { Button } from "@mui/material";

export default function Library() {
  const accessToken = Auth();
  const [albums, setAlbums] = useState([]);

  const getArtistAlbums = (token: string) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/albums?limit=50&locale=en-US`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getArtistAlbums(accessToken);
    }
  }, [accessToken]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsperPage, setitemsperPage] = useState(5);
  const indexOfLastItem = currentPage * itemsperPage;
  const indexOfFirstItem = indexOfLastItem - itemsperPage;
  const currentItems = albums.slice(indexOfFirstItem, indexOfLastItem);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);

  const renderData = (data: any) => {
    return (
      <ul>
        {data.map((album: Album, index: number) => {
          return <li key={index}>{album.name}</li>;
        })}
      </ul>
    );
  };

  const pages = [];
  for (let i = 1; i < Math.ceil(albums.length / itemsperPage); i++) {
    pages.push(i);
  }
  const handleClick = (event: any) => {
    setcurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <a
          className="bg-zinc-900 text-white rounded-md px-3 py-2 text-sm font-medium"
          key={number}
          onClick={handleClick}
        >
          {number}
        </a>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <NavBar />
      <div>
        <h1>Albums</h1> <br />
        <ul className="flex p-10 border-1 border-white">{renderPageNumbers}</ul>
        {renderData(currentItems)}
      </div>
    </div>
  );
}
