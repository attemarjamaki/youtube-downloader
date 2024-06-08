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
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
