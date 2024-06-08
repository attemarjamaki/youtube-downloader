"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Downloader = ({ videoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideoInfo = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/api/info`, {
          params: { url: `https://www.youtube.com/watch?v=${videoId}` },
        });
        setVideoInfo(response.data);
      } catch (error) {
        console.error("Error fetching video info:", error);
        setError("Failed to fetch video info");
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoInfo();
    }
  }, [videoId]);

  const handleDownload = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/download`, {
        params: { url: `https://www.youtube.com/watch?v=${videoId}` },
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!videoInfo) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-bold mb-4">{videoInfo.title}</h1>
      <div
        className="mb-4 relative w-full max-w-md h-0"
        style={{ paddingBottom: "56.25%" }}
      >
        <Image
          src={videoInfo.thumbnailUrl}
          alt="Video Thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <button
        onClick={handleDownload}
        className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90"
      >
        Download
      </button>
    </div>
  );
};

export default Downloader;
