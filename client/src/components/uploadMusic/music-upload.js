import { useState } from "react";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";

const MusicUpload = ({ onNext }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative h-24 w-full border border-muted-foreground border-dashed rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
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
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onNext} disabled={!fileName}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MusicUpload;
