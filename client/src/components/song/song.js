import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowBigDown } from "lucide-react";
import { IoIosArrowUp } from "react-icons/io";

const Song = ({ selectedLayout, setSelectedLayout }) => {
  const [selectedSongDetails, setSelectedSongDetails] = useState({
    name: "Cosmic Harmony",
    artist: "Stellar Sounds",
    coverImage: "/nft.avif",
    description:
      "A mesmerizing journey through space and sound, blending ethereal melodies with pulsating rhythms.",
    basePrice: "0.05 ETH",
    royalty: "10%",
    genre: "Electronic",
    duration: "4:32",
    releaseDate: "2024-03-15",
  });

  const songId = selectedLayout.split("view-song/")[1];

  useEffect(() => {
    console.log("Fetching details for song ID:", songId);
  }, [songId]);

  return (
    <div className="w-full flex flex-col gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="scroll-m-20 border-b pb-4 pt-2 text-3xl font-semibold tracking-tight sticky top-0 z-[50] bg-background w-full flex items-center gap-4"
      >
        <div
          className="hover:bg-muted text-foreground p-1.5 cursor-pointer rounded-full"
          onClick={() => setSelectedLayout("explore")}
        >
          <IoIosArrowUp size={24} className="-rotate-90" />
        </div>
        Song Details
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 pb-72">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/3"
        >
          <img
            src={selectedSongDetails.coverImage}
            alt={selectedSongDetails.name}
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-2/3 space-y-4"
        >
          <h2 className="text-4xl font-bold text-primary">
            {selectedSongDetails.name}
          </h2>
          <p className="text-xl text-muted-foreground">
            {selectedSongDetails.artist}
          </p>
          <p className="text-muted-foreground">
            {selectedSongDetails.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="border dark:border-none dark:bg-gray-800 bg-muted p-4 rounded-lg">
              <p className="text-foreground dark:text-gray-400">Base Price</p>
              <p className="text-2xl font-semibold text-green-400">
                {selectedSongDetails.basePrice}
              </p>
            </div>
            <div className="border dark:border-none dark:bg-gray-800 bg-muted p-4 rounded-lg">
              <p className="text-foreground dark:text-gray-400">Royalty</p>
              <p className="text-2xl font-semibold text-yellow-400">
                {selectedSongDetails.royalty}
              </p>
            </div>
            <div className="border dark:border-none dark:bg-gray-800 bg-muted p-4 rounded-lg">
              <p className="text-foreground dark:text-gray-400">Genre</p>
              <p className="text-xl font-semibold text-blue-400">
                {selectedSongDetails.genre}
              </p>
            </div>
            <div className="border dark:border-none dark:bg-gray-800 bg-muted p-4 rounded-lg">
              <p className="text-foreground dark:text-gray-400">Duration</p>
              <p className="text-xl font-semibold text-pink-400">
                {selectedSongDetails.duration}
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mt-4">
            Released on: {selectedSongDetails.releaseDate}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            Purchase Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Song;
