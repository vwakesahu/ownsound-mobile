import React from "react";
import { motion } from "framer-motion";
import CreatePlaylistAlert from "./createPlaylistAlert";

const Playlist = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          No Playlists Yet
        </h2>
        <p className="text-gray-600 mb-8">
          Create your first playlist to get started!
        </p>
        <CreatePlaylistAlert />
      </motion.div>
    </div>
  );
};

export default Playlist;
