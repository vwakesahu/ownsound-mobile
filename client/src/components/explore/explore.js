import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { audioTracks, playlists } from "@/utils/dummy";
import HorizontalScroll from "../horizontal-scroll";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../ui/input";

const Explore = () => {
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

  const renderTrackItem = (track) => (
    <>
      <div className="w-36 h-36">
        <img
          src={track.cover}
          className="aspect-square rounded-md w-full h-full object-cover"
          alt={track.title}
        />
      </div>
      <div>
        <p
          className="w-full text-center truncate max-w-xs mx-auto"
          title={track.title}
        >
          {track.title}
        </p>
        <p className="text-sm text-center text-muted-foreground">
          {track.artist}
        </p>
      </div>
    </>
  );

  const renderPlaylistItem = (playlist) => (
    <>
      <div className="w-36 h-36">
        <img
          src={playlist.image}
          className="aspect-square rounded-md w-full h-full object-cover"
          alt={playlist.name}
        />
      </div>
      <div>
        <p
          className="w-full text-center truncate max-w-xs mx-auto"
          title={playlist.name}
        >
          {playlist.name}
        </p>
        <p className="text-sm text-center text-muted-foreground">
          {playlist.tracks.length} songs
        </p>
      </div>
    </>
  );

  const filteredTracks = filterItems(audioTracks, searchQuery);
  const filteredPlaylists = filterItems(playlists, searchQuery);

  return (
    <div className="w-full flex flex-col gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide mt-2">
      <div className="mt-10 scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0 sticky top-0 z-[50] bg-background w-full flex items-center justify-between">
        Explore
        <div className="w-auto p-1">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredTracks.length > 0 && (
        <>
          {/* <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
            Tracks
          </div> */}
          <HorizontalScroll
            items={filteredTracks}
            renderItem={renderTrackItem}
            containerId={`scrollContainer-${uuidv4()}`}
          />
        </>
      )}

      {filteredPlaylists.length > 0 && (
        <>
          <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
            Popular Playlists
          </div>
          <HorizontalScroll
            items={filteredPlaylists}
            renderItem={renderPlaylistItem}
            containerId={`scrollContainer-${uuidv4()}`}
          />
        </>
      )}
    </div>
  );
};

export default Explore;
