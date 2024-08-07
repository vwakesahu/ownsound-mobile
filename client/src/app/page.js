"use client";
import BottomAudioPlayer from "@/components/bottom-audio-player";
import Loader from "@/components/loader";
import { ResizableComponent } from "@/components/resizable";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const musicPlayer = useSelector((state) => state.musicPlayer);
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
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed w-full bottom-0 border-t p-4 bg-backgroundOpac backdrop-blur-xl grid grid-cols-3"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 items-center z-50"
          >
            <motion.img
              src={musicPlayer.coverImage || "/nft.avif"}
              alt="cover"
              className="w-12 h-12 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-semibold"
              >
                {musicPlayer.title || "Yo! Click on music to play"}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm"
              >
                {musicPlayer.artist || "Follow Qoneqt on instagram"}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-[36rem] h-full"
        >
          <div>
            <BottomAudioPlayer
              url={musicPlayer.uri}
              musicPlayer={musicPlayer}
            />
          </div>
        </motion.div>
        <div></div>
      </motion.div>
    </div>
  );
};

export default Page;
