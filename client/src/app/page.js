"use client";
import BottomAudioPlayer from "@/components/bottom-audio-player";
import Loader from "@/components/loader";
import { ResizableComponent } from "@/components/resizable";
import { audioTracks } from "@/utils/dummy";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";

const Page = () => {
  const [musicPlayer, setMusicPlayer] = useState({
    isPlaying: false,
    index: 0,
  });
  const [selectedLayout, setSelectedLayout] = useState("home");
  const [selectedMode, setSelectedMode] = useState("songs");
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  if (!ready)
    return (
      <div className="w-full grid items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="h-screen">
      <ResizableComponent
        w0={w0}
        musicPlayer={musicPlayer}
        setMusicPlayer={setMusicPlayer}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
      />
      <div className="fixed w-full bottom-0 border-t p-4 bg-backgroundOpac backdrop-blur-xl grid grid-cols-3">
        <div className="flex gap-3 items-center">
          <img
            src={
              audioTracks[musicPlayer.index].cover
                ? audioTracks[musicPlayer.index].cover
                : audioTracks[0].cover
            }
            alt="cover"
            className="w-12 h-12 rounded-md"
          />
          <div>
            <p className="font-semibold">
              {audioTracks[musicPlayer.index].title}
            </p>
            <p className="text-sm">{audioTracks[musicPlayer.index].artist}</p>
          </div>
        </div>
        <div className="w-[36rem] h-full">
          <div>
            <BottomAudioPlayer
              url={audioTracks[musicPlayer.index].soundUri}
              musicPlayer={musicPlayer}
              setMusicPlayer={setMusicPlayer}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
