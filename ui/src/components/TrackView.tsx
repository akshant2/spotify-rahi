import React, { FC, useEffect, useState } from "react";
import ExplicitIcon from "@mui/icons-material/Explicit";
import CloseIcon from "@mui/icons-material/Close";
import { Album, Artist, Track } from "../types";
import LyricsIcon from "@mui/icons-material/Lyrics";
import { Auth } from "../utils/Auth";
import { Tooltip } from "@mui/material";

export const TrackView: FC<TrackViewType> = function (track) {
  const accessToken = Auth();
  const [trackData, setTrackData] = useState({
    acousticness: "",
    danceability: "",
    energy: "",
    loudness: "",
    valence: "",
  });
  const [showModal, setShowModal] = useState(false);
  const getTrack = (token: string): void => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/audio-features/${track.id}`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setTrackData({
          acousticness: data.acousticness,
          danceability: data.danceability,
          energy: data.energy,
          loudness: data.loudness,
          valence: data.valence,
        });
      });
  };

  useEffect(() => {
    if (accessToken) {
      getTrack(accessToken);
    }
  }, [accessToken]);

  return (
    <div>
      <a className="text-base font-semibold">
        {<LyricsIcon onClick={(): void => setShowModal(true)} />}
      </a>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <div className="flex">
                  <img
                    className="w-16 h-16"
                    src={
                      track.image != ""
                        ? track.image
                        : track.album.images[0].url
                    }
                    alt="Track Image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{track.name}</div>
                    <div className="flex mt-1 font-normal text-gray-500">
                      {track.explicit ? <ExplicitIcon /> : ""}
                      <div className="flex px-1 mt-0.5">
                        {track.artists
                          .map((artist) => `${artist.name}`)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={(): void => setShowModal(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="flex content-center bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
                      <dt className="mt-1 text-sm font-medium">
                        <Tooltip
                          title="A confidence measure from 0.0 to 1.0 of whether the track is acoustic."
                          arrow
                          placement="top"
                        >
                          <h1 className="font-semibold text-gray-600">
                            {"Acousticness:"}
                          </h1>
                        </Tooltip>
                        <h1 className="text-gray-900">
                          {trackData.acousticness}
                        </h1>
                      </dt>
                      <dt className="mt-1 text-sm font-medium">
                        <Tooltip
                          title="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
                          arrow
                          placement="top"
                        >
                          <h1 className="font-semibold text-gray-600">
                            {"Danceability:"}
                          </h1>
                        </Tooltip>
                        <h1 className="text-gray-900">
                          {trackData.danceability}
                        </h1>
                      </dt>
                      <dt className="mt-1 text-sm font-medium">
                        <Tooltip
                          title="Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."
                          arrow
                          placement="top"
                        >
                          <h1 className="font-semibold text-gray-600">
                            {"Energy:"}
                          </h1>
                        </Tooltip>
                        <h1 className="text-gray-900">{trackData.energy}</h1>
                      </dt>
                      <dt className="mt-1 text-sm font-medium">
                        <Tooltip
                          title="The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db."
                          arrow
                          placement="top"
                        >
                          <h1 className="font-semibold text-gray-600">
                            {"Loudness:"}
                          </h1>
                        </Tooltip>
                        <h1 className="text-gray-900">{trackData.loudness}</h1>
                      </dt>
                      <dt className="mt-1 text-sm font-medium">
                        <Tooltip
                          title="A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
                          arrow
                          placement="top"
                        >
                          <h1 className="font-semibold text-gray-600">
                            {"Valence:"}
                          </h1>
                        </Tooltip>
                        <h1 className="text-gray-900">{trackData.valence}</h1>
                      </dt>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                        LYRICS GO HERE
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

type TrackViewType = {
  explicit: boolean;
  artists: Artist[];
  name: string;
  album: Album;
  track: Track;
  id: string;
  image: string;
};
