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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">YouTube Downloader</h1>
      <form
        onSubmit={handleDownload}
        className="flex flex-col items-center w-1/2"
      >
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading || url === ""}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </form>
    </div>
  );
};

export default Downloader;
