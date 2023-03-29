import React from "react";

export default function msToTime(s: number): string {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const minutes = s % 60;
  const min = String(minutes).padStart(2, "0");
  const sec = String(secs).padStart(2, "0");
  return min + ":" + sec;
}
