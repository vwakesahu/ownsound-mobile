import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { audioTracks, playlists } from "@/utils/dummy";
import HorizontalScroll from "../horizontal-scroll";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../ui/input";
import TrackItem from "./track-item";
import PlaylistItem from "./playlistItem";
import { motion } from "framer-motion";

const Explore = ({ setSelectedLayout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterItems = (items, query) => {
    return items.filter((item) => {
      const title = item.title || "";
      const name = item.name || "";
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        name.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const filteredTracks = filterItems(audioTracks, searchQuery);
  const filteredPlaylists = filterItems(playlists, searchQuery);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="w-full flex flex-col gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="mt-10 scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0 sticky top-0 z-[50] bg-background w-full flex items-center justify-between"
        variants={itemVariants}
      >
        Explore
        <motion.div
          className="w-auto p-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </motion.div>
      </motion.div>

      {filteredTracks.length > 0 && (
        <motion.div variants={itemVariants}>
          <HorizontalScroll
            items={filteredTracks}
            renderItem={(track) => (
              <TrackItem track={track} setSelectedLayout={setSelectedLayout} />
            )}
            containerId={`scrollContainer-${uuidv4()}`}
          />
        </motion.div>
      )}

      {filteredPlaylists.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            className="scroll-m-20 mb-5 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0"
            variants={itemVariants}
          >
            Popular Playlists
          </motion.div>
          <HorizontalScroll
            items={filteredPlaylists}
            renderItem={(playlist) => (
              <PlaylistItem
                playlist={playlist}
                setSelectedLayout={setSelectedLayout}
              />
            )}
            containerId={`scrollContainer-${uuidv4()}`}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Explore;
