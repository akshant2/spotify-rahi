import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {
  Container,
  TextField,
  Card,
  IconButton,
  CardMedia,
  Grid,
  CardContent,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
//import SpotifyWebApi from 'spotify-web-api-node'

function App() {
  //const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <Login /> : <Dashboard />
    </div>
  );
}

export default App;
