"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";

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

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (event) => {
    event.preventDefault();

    if (!isValidYouTubeURL(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/api/download", {
        params: { url },
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = "video.mp4";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the video:", error);
      setError("Failed to download the video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center">
      <form onSubmit={handleDownload} className="flex flex-wrap gap-4 mt-20">
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
          className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={loading || url === ""}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Downloader;
