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
        <div className="inline-flex rounded-full bg-base-200 p-1 mb-4">
          <button
            onClick={() => handleTabClick("mp4")}
            className={`py-2 px-8 rounded-full font-medium focus:outline-none transition ease-in-out duration-150 ${
              activeTab === "mp4"
                ? "bg-base-100 text-primary shadow"
                : "text-neutral hover:text-primary"
            }`}
          >
            MP4
          </button>
          <button
            onClick={() => handleTabClick("mp3")}
            className={`py-2 px-8 rounded-full font-medium focus:outline-none transition ease-in-out duration-150 ${
              activeTab === "mp3"
                ? "bg-base-100 text-primary shadow"
                : "text-neutral hover:text-primary"
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
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-neutral font-medium hover:text-primary border-2 border-transparent focus:border-primary focus:text-primary">
              Highest
            </button>
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-neutral font-medium hover:text-primary border-2 border-transparent focus:border-primary focus:text-primary">
              Lowest
            </button>
          </div>
        </div>
      )}

      {activeTab === "mp3" && (
        <div className="flex flex-col items-center w-4/5 max-w-[500px]">
          <h3 className="mb-4 text-lg font-semibold">Choose quality</h3>
          <div className="flex w-full space-x-4">
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-neutral font-medium hover:text-primary border-2 border-transparent focus:border-primary focus:text-primary">
              Highest
            </button>
            <button className="flex-1 py-2 px-4 mx-auto rounded-xl text-neutral font-medium hover:text-primary border-2 border-transparent focus:border-primary focus:text-primary">
              Lowest
            </button>
          </div>
          <h3 className="mt-6 mb-4 text-lg font-semibold">Choose Metadata</h3>
          <div className="w-4/5">
            <form className="flex flex-col space-y-2 ">
              <input
                type="text"
                placeholder="Song Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Artist"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Album"
                className="input input-bordered w-full"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TabSwitcher;
