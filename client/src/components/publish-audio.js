import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { UploadCloud, Percent } from "lucide-react";

const PublishAudio = () => {
  const [isRentingAllowed, setIsRentingAllowed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [royaltyPrice, setRoyaltyPrice] = useState("");
  const [royaltyPercentage, setRoyaltyPercentage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("songDescription", songDescription);
    formData.append("basePrice", basePrice);
    formData.append("royaltyPrice", royaltyPrice);
    formData.append("royaltyPercentage", royaltyPercentage);
    formData.append("isRentingAllowed", isRentingAllowed);
    if (fileName) {
      formData.append("musicFile", fileName);
    }
    if (imageSrc) {
      formData.append("coverImage", imageSrc);
    }

    // Log data for debugging
    console.log("Form Data:", formData);

    // You can also handle the FormData here, e.g., send it to an API
    // fetch('/api/endpoint', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">Publish Audio</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Audio</AlertDialogTitle>
          <AlertDialogDescription>
            Share your music with the world and showcase your tracks
            effortlessly in just a few clicks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3">
          <div className="relative h-24 w-full border border-muted-foreground border-dashed rounded-md flex items-center justify-center gap-2 cursor-pointer">
            <input
              type="file"
              accept="audio/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            <UploadCloud className="text-muted-foreground w-8 h-8" />
            <p className="text-muted-foreground">
              {fileName ? `Selected File: ${fileName}` : "Upload Music File"}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            {/* This Div to upload */}
            <div className="w-24 h-24 bg-muted rounded-md overflow-hidden relative">
              {imageSrc ? (
                <>
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="absolute z-[99999999999] bottom-1 right-1 bg-red-600 text-white rounded-full p-1 transition-opacity"
                  >
                    <MdDeleteForever />
                  </button>
                </>
              ) : (
                <div className="relative h-full w-full flex items-center justify-center">
                  <div>
                    <UploadCloud className="text-muted-foreground" />
                  </div>
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
            <div className="h-16 flex flex-col justify-between">
              <Label>Song Name</Label>
              <Input
                placeholder="Enter song name"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
              />
            </div>
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
              <Label>Base price</Label>
              <div className="flex items-center gap-3 w-full mt-2.5">
                <Input
                  placeholder="Enter Base Price"
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
                <Image
                  src={"/icons/token-coin.svg"}
                  width={20}
                  height={20}
                  alt="coin"
                />
              </div>
            </div>
            <div>
              <Label>Royalty price</Label>
              <div className="flex items-center gap-3 w-full mt-2.5">
                <Input
                  placeholder="Enter Royalty Price"
                  type="number"
                  value={royaltyPrice}
                  onChange={(e) => setRoyaltyPrice(e.target.value)}
                />
                <Image
                  src={"/icons/token-coin.svg"}
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishAudio;
