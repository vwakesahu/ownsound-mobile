import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Login from "./login";
import { Badge } from "./ui/badge";
import { ArrowLeftIcon, PauseIcon, PlayIcon } from "lucide-react";
import { audioTracks, playlists } from "@/utils/dummy";
import { useState } from "react";
import PublishAudio from "./uploadMusic/publish-audio";
import Image from "next/image";
import { User } from "lucide-react";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import Profile from "./profile/profile";
import Explore from "./explore/explore";

export function ResizableComponent({
  w0,
  musicPlayer,
  setMusicPlayer,
  selectedMode,
  setSelectedMode,
  selectedLayout,
  setSelectedLayout,
}) {
  const [clickedIdx, setClickedIdx] = useState(0);

  const handleSelectedMusicPlay = (index) => {
    setMusicPlayer({ ...musicPlayer, index: index });
  };

  const menuItems = [
    { name: "Home", icon: BiHomeAlt2 },
    { name: "Explore", icon: CiGlobe },
    { name: "Profile", icon: User },
  ];
  const handleClick = (item) => {
    setSelectedLayout(item.toLowerCase());
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center gap-3 w-full p-6 dark:bg-muted/10 bg-muted border-b">
          <Image
            src={"/icons/token-coin.svg"}
            width={25}
            height={25}
            alt="coin"
          />
          <p className="">Own Sound</p>
        </div>
        <div className="flex flex-col space-y-6 p-4 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`flex items-center space-x-2 cursor-pointer transition-transform transform ${
                  selectedLayout === item.name.toLocaleLowerCase()
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => handleClick(item.name)}
              >
                <Icon className="h-6 w-6" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={120}>
        <div className="p-6">
          {/* {selectedLayout === "profile" && (
            <div className="w-full flex items-center justify-end">
              <PublishAudio />
            </div>
          )} */}

          {selectedLayout === "home" && <div className="mt-10">Home</div>}
          {selectedLayout === "song" && (
            <div className="h-full flex items-center justify-center mt-10">
              <img
                src={audioTracks[musicPlayer.index].cover}
                width={600}
                height={600}
                className="rounded-lg drop-shadow-md aspect-square"
              />
            </div>
          )}
          {selectedLayout === "profile" && <Profile />}
          {selectedLayout === "explore" && <Explore />}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <Login w0={w0} />
            <div className="p-6 flex items-center gap-4">
              <Badge
                className={
                  selectedMode === "songs"
                    ? "bg-primary text-white cursor-pointer"
                    : "bg-transparent text-foreground hover:bg-muted cursor-pointer"
                }
                onClick={() => setSelectedMode("songs")}
              >
                Songs
              </Badge>
              <Badge
                className={
                  selectedMode === "playlists"
                    ? "bg-primary text-white cursor-pointer"
                    : "bg-transparent text-foreground hover:bg-muted cursor-pointer"
                }
                onClick={() => setSelectedMode("playlists")}
              >
                Playlists
              </Badge>
            </div>
            <div className="">
              {selectedMode === "playlists" ? (
                <Playlists
                  playlists={playlists}
                  clickedIdx={clickedIdx}
                  handleSelectedMusicPlay={handleSelectedMusicPlay}
                  setClickedIdx={setClickedIdx}
                />
              ) : (
                <MusicList
                  audioTracks={audioTracks}
                  clickedIdx={clickedIdx}
                  handleSelectedMusicPlay={handleSelectedMusicPlay}
                  setClickedIdx={setClickedIdx}
                />
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

const Playlists = ({
  playlists,
  clickedIdx,
  setClickedIdx,
  handleSelectedMusicPlay,
}) => {
  // State to keep track of the currently selected playlist
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Handler function to set the selected playlist
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="px-6 space-y-4">
      {selectedPlaylist ? (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeftIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => setSelectedPlaylist(null)}
            />
            <h2 className="text-xl font-semibold">{selectedPlaylist.name}</h2>
          </div>

          <div className="space-y-2">
            {selectedPlaylist.tracks.map((track, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between p-4 hover:bg-muted rounded-md border"
              >
                <div className="w-full flex items-center gap-4">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-gray-500">{track.artist}</p>
                  </div>
                </div>
                <div className="grid place-items-center">
                  <div
                    className="rounded-full p-1.5 bg-primary cursor-pointer"
                    onClick={() => {
                      handleSelectedMusicPlay(index);
                      setClickedIdx(index);
                    }}
                  >
                    {clickedIdx === index ? (
                      <PauseIcon className="w-3 h-3 text-white" />
                    ) : (
                      <PlayIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        playlists.map((playlist, index) => (
          <div
            key={index}
            onClick={() => handlePlaylistClick(playlist)}
            className="flex w-full items-center justify-between p-4 hover:bg-muted rounded-md border cursor-pointer"
          >
            <div className="w-full flex items-center gap-4">
              <img
                src={playlist.image}
                alt="cover"
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="font-semibold">{playlist.name}</p>
                <p className="text-sm text-gray-500">
                  {playlist.tracks.length} songs
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const MusicList = ({
  audioTracks,
  clickedIdx,
  setClickedIdx,
  handleSelectedMusicPlay,
}) => {
  return (
    <div className="px-6 space-y-4">
      {audioTracks.map((track, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between p-4 hover:bg-muted rounded-md border"
        >
          <div className="w-full flex items-center gap-4">
            <img
              src={track.cover}
              alt="cover"
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
          </div>
          <div className="grid place-items-center">
            <div
              className="rounded-full p-1.5 bg-primary cursor-pointer"
              onClick={() => {
                handleSelectedMusicPlay(index);
                setClickedIdx(index);
              }}
            >
              {clickedIdx === index ? (
                <PauseIcon className="w-3 h-3 text-white" />
              ) : (
                <PlayIcon className="w-3 h-3 text-white" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
