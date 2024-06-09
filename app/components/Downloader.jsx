"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import TabSwitcher from "./TabSwicher";

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
    return (
      <div class="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  /*
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
*/
  if (!videoInfo) {
    return null;
  }

  return (
    <>
      <section className="px-4 py-24 max-w-5xl mx-auto">
        <div className="flex max-lg:flex-col gap-16">
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <h3 className="text-xl font-semibold">
              Download:
              <span className="font-normal"> {videoInfo.title}</span>
            </h3>
            <Image
              src={videoInfo.thumbnailUrl}
              alt="Video Thumbnail"
              width={420}
              height={236}
              objectFit="cover"
              className="rounded-lg mt-6"
            />
          </div>
          <div className="flex flex-col items-center lg:w-1/2">
            <TabSwitcher />
            <div className="mt-12">
              <button onClick={handleDownload} className="btn btn-primary">
                Download
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Downloader;
