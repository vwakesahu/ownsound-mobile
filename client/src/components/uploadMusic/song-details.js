import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { Percent } from "lucide-react";

const SongDetails = ({ onPrevious, onSubmit }) => {
  const [isRentingAllowed, setIsRentingAllowed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [royaltyPrice, setRoyaltyPrice] = useState("");
  const [royaltyPercentage, setRoyaltyPercentage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImageSrc(null);
  };

  return (
    <AlertDialog>
      <AlertDialogContent className="transition-transform duration-500 ease-in-out transform translate-x-0 opacity-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Audio</AlertDialogTitle>
          <AlertDialogDescription>
            Share your music with the world and showcase your tracks
            effortlessly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3">
          {/* Upload Image */}
          <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden">
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleDeleteImage}
                  className="absolute bottom-1 right-1 bg-red-600 text-white rounded-full p-1 transition-opacity duration-300"
                >
                  <MdDeleteForever />
                </button>
              </>
            ) : (
              <div className="relative h-full w-full flex items-center justify-center">
                <label className="absolute cursor-pointer flex items-center justify-center w-full h-full text-muted">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
          {/* Song Details Form */}
          <div className="h-16 flex flex-col justify-between">
            <Label>Song Name</Label>
            <Input
              placeholder="Enter song name"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
            />
          </div>
          <div>
            <Label>Song Description</Label>
            <Textarea
              placeholder="Enter song description"
              className="mt-2.5"
              value={songDescription}
              onChange={(e) => setSongDescription(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 pt-2">
              <Label htmlFor="isRentingAllowed">Renting Allowed?</Label>
              <Switch
                id="isRentingAllowed"
                onCheckedChange={(e) => setIsRentingAllowed(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Base Price</Label>
              <div className="flex items-center gap-3 w-full mt-2.5">
                <Input
                  placeholder="Enter Base Price"
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
                <Image
                  src="/icons/token-coin.svg"
                  width={20}
                  height={20}
                  alt="coin"
                />
              </div>
            </div>
            <div>
              <Label>Royalty Price</Label>
              <div className="flex items-center gap-3 w-full mt-2.5">
                <Input
                  placeholder="Enter Royalty Price"
                  type="number"
                  value={royaltyPrice}
                  onChange={(e) => setRoyaltyPrice(e.target.value)}
                />
                <Image
                  src="/icons/token-coin.svg"
                  width={20}
                  height={20}
                  alt="coin"
                />
              </div>
            </div>
          </div>
          <div>
            <Label>Royalty Percentage</Label>
            <div className="flex items-center gap-3 w-full mt-2.5">
              <Input
                placeholder="Enter percentage"
                type="number"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(e.target.value)}
              />
              <Percent className="text-muted-foreground w-4" />
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onPrevious}>Back</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              onSubmit({
                songName,
                songDescription,
                basePrice,
                royaltyPrice,
                royaltyPercentage,
                isRentingAllowed,
                coverImage: imageSrc,
              })
            }
          >
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SongDetails;
