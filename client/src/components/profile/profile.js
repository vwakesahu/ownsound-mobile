import { PencilIcon } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { audioTracks, playlists } from "@/utils/dummy";

const Profile = () => {
  return (
    <div className="w-full grid gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        GM Ser!
      </div>

      <div className="flex w-full gap-3 items-center">
        <div className="w-24 h-24 relative">
          <img src="/nft.avif" className="rounded-lg" />
          <div className="w-6 h-6 flex items-center justify-center absolute bg-muted z-50 -bottom-2 -right-2 rounded-full cursor-pointer drop-shadow">
            <PencilIcon className="w-3" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Username</Label>
          <Input placeholder="Change username" className="max-w-xs" />
        </div>
      </div>
      <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
        Your NFS's
      </div>
      <div className="grid grid-cols-5 gap-4">
        {audioTracks.map((track, index) => (
          <div key={index} className="space-y-2">
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
          </div>
        ))}
      </div>
      <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
        Your Playlists
      </div>
      <div className="grid grid-cols-5 gap-4">
        {playlists.map((track, index) => (
          <div key={index} className="space-y-2">
            <div className="w-36 h-36">
              <img
                src={track.image}
                className="aspect-square rounded-md w-full h-full object-cover"
                alt={track.name}
              />
            </div>
            <div>
              <p
                className="w-full text-center truncate max-w-xs mx-auto"
                title={track.name}
              >
                {track.name}
              </p>
              <p className="text-sm text-center text-muted-foreground">
                {track.creator}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
