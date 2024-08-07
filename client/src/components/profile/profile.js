import { PencilIcon, PlayCircle, PlayIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { audioTracks, playlists } from "@/utils/dummy";
import HorizontalScroll from "../horizontal-scroll";
import { v4 as uuidv4 } from "uuid";
import PublishAudio from "../uploadMusic/publish-audio";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Contract } from "ethers";
import { ownSoundContractABI, ownSoundContractAddress } from "@/utils/contract";
import Loader from "../loader";
import Lottie from "lottie-react";
import animationData from "@/animations/no.json";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMusicPlayer } from "@/redux/musicPlayerSlice";
import TrackItem from "./track-item";
import PlaylistItem from "./playlist-item";

const Profile = () => {
  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSongs = async (address) => {
    if (!address) {
      toast.error("Address is not provided");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const provider = await w0?.getEthersProvider();
      if (!provider) {
        console.error("Provider is not available:", provider);
        throw new Error("Provider is not available");
      }

      const signer = await provider.getSigner();
      if (!signer) {
        console.error("Signer is not available:", signer);
        throw new Error("Signer is not available");
      }

      const contract = new Contract(
        ownSoundContractAddress,
        ownSoundContractABI,
        signer
      );

      const res = await contract.getWalletTokensWithMetadata(address);

      console.log(res);
      setSongs(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ready && authenticated && w0?.address !== undefined) {
      console.log("Wallet Address: ", w0.address);
      getSongs(w0.address);
    }
  }, [w0, ready, authenticated]);

  return (
    <div className="w-full flex flex-col gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="mt-10 scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0 w-full flex items-center justify-between sticky top-0 z-50 bg-background">
        GM Ser!
        <PublishAudio getSongs={getSongs} w0={w0} />
      </div>

      <div className="flex w-full gap-3 items-center">
        <div className="w-24 h-24 relative">
          <img src="/nft.avif" className="rounded-lg" />
          <div className="w-6 h-6 flex items-center justify-center absolute bg-muted z-10 -bottom-2 -right-2 rounded-full cursor-pointer drop-shadow">
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
      {loading ? (
        <div className="grid place-items-center min-h-32">
          <Loader />
        </div>
      ) : error ? (
        <p>Error loading songs</p>
      ) : songs.length === 0 ? (
        <div className="w-full h-32 flex items-center justify-center">
          <div className="w-20 h-20">
            <Lottie animationData={animationData} />
          </div>
          <p className="text-muted-foreground">No NFS's found!</p>
        </div>
      ) : (
        <HorizontalScroll
          items={songs}
          renderItem={(song) => <TrackItem song={song} />}
          containerId={`scrollContainer-${uuidv4()}`}
        />
      )}

      <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
        Your Playlist
      </div>
      <HorizontalScroll
        items={playlists}
        renderItem={(playlist) => <PlaylistItem playlist={playlist} />}
        containerId={`scrollContainer-${uuidv4()}`}
      />
    </div>
  );
};

export default Profile;
