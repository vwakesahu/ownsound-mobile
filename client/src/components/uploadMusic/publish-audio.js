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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { UploadCloud, Percent } from "lucide-react";
import axios from "axios";

const PublishAudio = () => {
  const [musicFile, setMusicFile] = useState(null);
  const [step, setStep] = useState(1);
  const [isRentingAllowed, setIsRentingAllowed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [royaltyPrice, setRoyaltyPrice] = useState("");
  const [royaltyPercentage, setRoyaltyPercentage] = useState("");

  const [formData, setFormData] = useState({
    songName: "",
    songDescription: "",
    basePrice: "",
    royaltyPrice: "",
    royaltyPercentage: "",
    isRentingAllowed: false,
  });
  const handleFileUpload = async (e) => {
    const formData = {
      songName: "",
      songDescription: "",
      basePrice: "",
      royaltyPrice: "",
      royaltyPercentage: "",
      isRentingAllowed: false,
    };
    const file = e.target.files[0];
    if (file) {
      try {
        const data = new FormData();

        // Append text fields
        Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
        });

        // Append music file
        data.append("musicFile", file);

        // Append cover image if it exists
        // if (coverImage) {
        //   data.append("coverImage", coverImage);
        // }

        const response = await axios.post(
          "https://ownsound-qiim.vercel.app/endpoint",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response.data);

        setMusicFile(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
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

  const handleNextStep = async () => {
    if (step === 1 && fileName && musicFile) {
      //upload music get reposnse
      // const { data } = await axios.post("/api/upload", formData);
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("songDescription", songDescription);
    formData.append("basePrice", basePrice);
    formData.append("royaltyPrice", royaltyPrice);
    formData.append("royaltyPercentage", royaltyPercentage);
    formData.append("isRentingAllowed", isRentingAllowed);

     if (musicFile) {
       formData.append("musicFile", musicFile);
     }

     if (imageSrc) {
       formData.append("coverImage", imageSrc);
     }

     // Log data for debugging
     console.log("Form Data:");
     for (const [key, value] of formData.entries()) {
       console.log(`${key}: ${value}`);
     }

    // Handle the FormData, e.g., send it to an API
    // const { data } = await axios.post("/api/upload", formData);
    // console.log(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" className="w-full h-full">
          Publish Audio
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {step === 1 ? "Upload Music" : "Song Details"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {step === 1
              ? "Upload your music file and proceed to enter the song details."
              : "Enter the details of your song and finalize your submission."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3">
          {step === 1 && (
            <>
              <div className="relative h-24 w-full border border-muted-foreground border-dashed rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
                <input
                  type="file"
                  accept="audio/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
                <UploadCloud className="text-muted-foreground w-8 h-8" />
                <p className="text-muted-foreground">
                  {fileName
                    ? `Selected File: ${fileName}`
                    : "Upload Music File"}
                </p>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex gap-3 items-center">
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
            </>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {step === 1 && (
            <Button onClick={handleNextStep} disabled={!fileName}>
              Next
            </Button>
          )}
          {step === 2 && (
            <>
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!songName || !songDescription}
              >
                Upload
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishAudio;
