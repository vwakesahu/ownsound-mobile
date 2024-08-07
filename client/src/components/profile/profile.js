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

  const renderTrackItem = (song) => {
    const dispatch = useDispatch();
    const [id, metadata, ownership] = song;
    const playSong = async (id, meta) => {
      const { data } = await axios.post(`/api/hashsong`, { randomId: id });
      console.log(data);
      dispatch(
        setMusicPlayer({
          uri: data,
          isPlaying: true,
          index: 0,
          coverImage: meta[5],
          title: meta[3],
          artist: meta[4],
        })
      );
    };

    return (
      <>
        <div className="relative flex">
          <div className="w-36 h-36">
            <img
              src={metadata[5]} // coverImage URL
              className="aspect-square rounded-md w-full h-full object-cover"
              alt={metadata[3]} // title
            />
          </div>
          <div
            className="w-10 h-10 bg-primary z-10 -bottom-3 -right-2 absolute rounded-full flex items-center justify-center text-white"
            onClick={() => {
              playSong(
                "bafybeic5zcykf7fpg7c2zuf76p2gddegxlt64hbfp76qqs7l4l6yx3nraa",
                metadata
              );
            }}
          >
            <PlayCircle />
          </div>
        </div>

        <div>
          <p
            className="w-full text-center truncate max-w-xs mx-auto"
            title={metadata[3]} // title
          >
            {metadata[3]}
          </p>
          <p className="text-sm text-center text-muted-foreground">
            {metadata[4]}
          </p>
        </div>
      </>
    );
  };

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
          {playlist.creator}
        </p>
      </div>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-6 pb-32 h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="mt-10 scroll-m-20 border-b pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0 w-full flex items-center justify-between sticky top-0 z-50 bg-background">
        GM Ser!
        <PublishAudio getSongs={getSongs} w0={w0} />
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
          renderItem={renderTrackItem}
          containerId={`scrollContainer-${uuidv4()}`}
        />
      )}

      <div className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
        Your Playlist
      </div>
      <HorizontalScroll
        items={playlists}
        renderItem={renderPlaylistItem}
        containerId={`scrollContainer-${uuidv4()}`}
      />
    </div>
  );
};

export default Profile;
