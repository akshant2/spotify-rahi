import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";
import AlbumPage from "../components/AlbumPage";
import PlaylistPage from "../components/PlaylistPage";
import Library from "../components/Library";
class AppRouter extends React.Component {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
