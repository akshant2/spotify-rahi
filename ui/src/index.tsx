import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./styles/tailwind.css";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { SearchBar } from "./Pages/SearchBar";
import { AlbumPage } from "./Pages/AlbumPage";
import { PlaylistPage } from "./Pages/PlaylistPage";
import { ArtistPage } from "./Pages/ArtistPage";
import { CategoryPage } from "./Pages/CategoryPage";
import { Library } from "./Pages/Library";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
