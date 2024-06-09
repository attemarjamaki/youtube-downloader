"use client";

import React, { useState } from "react";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState("mp4");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="inline-flex rounded-full bg-gray-200 p-1 mb-4">
          <button
            onClick={() => handleTabClick("mp4")}
            className={`py-2 px-8 rounded-full font-medium focus:outline-none transition ease-in-out duration-150 ${
              activeTab === "mp4"
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            MP4
          </button>
          <button
            onClick={() => handleTabClick("mp3")}
            className={`py-2 px-8 rounded-full font-medium focus:outline-none transition ease-in-out duration-150 ${
              activeTab === "mp3"
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            MP3
          </button>
        </div>
      </div>
      {activeTab === "mp4" && (
        <div className="flex flex-col items-center w-4/5 max-w-[500px]">
          <h3 className="mb-4 text-lg font-semibold">Choose quality</h3>
          <div className="flex w-full space-x-4">
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-gray-600 font-medium hover:text-blue-600 border-2 border-transparent focus:border-blue-600 focus:text-blue-600">
              Highest
            </button>
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-gray-600 font-medium hover:text-blue-600 border-2 border-transparent focus:border-blue-600 focus:text-blue-600">
              Lowest
            </button>
          </div>
        </div>
      )}

      {activeTab === "mp3" && (
        <div className="flex flex-col items-center w-4/5 max-w-[500px]">
          <h3 className="mb-4 text-lg font-semibold">Choose quality</h3>
          <div className="flex w-full space-x-4">
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-gray-600 font-medium hover:text-blue-600 border-2 border-transparent focus:border-blue-600 focus:text-blue-600">
              Highest
            </button>
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-gray-600 font-medium hover:text-blue-600 border-2 border-transparent focus:border-blue-600 focus:text-blue-600">
              Lowest
            </button>
          </div>
          <h3 className="mt-6 mb-4 text-lg font-semibold">Choose Metadata</h3>
          <div className="w-4/5">
            <form className="flex flex-col space-y-2 ">
              <input
                type="text"
                placeholder="Song Name"
                className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Artist"
                className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Album"
                className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TabSwitcher;
