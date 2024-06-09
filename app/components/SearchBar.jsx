"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const isValidYouTubeURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check for valid YouTube domains
    return (
      hostname === "www.youtube.com" ||
      hostname === "youtube.com" ||
      hostname === "youtu.be"
    );
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();

    if (!isValidYouTubeURL(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setError("");
    const videoId = new URL(url).searchParams.get("v") || url.split("/").pop();
    router.push(`/video/${videoId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-4 w-full px-4"
      >
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className=" flex-1 input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary" disabled={url === ""}>
          Download
        </button>
      </form>
      {error && <p className="text-error mt-6">{error}</p>}
    </div>
  );
};

export default SearchBar;
