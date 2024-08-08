import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Input } from "@/components/ui/input";
import { Check, X, Music } from "lucide-react";

const CreatePlaylistAlert = () => {
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const dummyAudios = [
    { id: 1, name: "Song 1 - Artist A" },
    { id: 2, name: "Song 2 - Artist B" },
    { id: 3, name: "Song 3 - Artist C" },
    { id: 4, name: "Song 4 - Artist D" },
    { id: 23, name: "Song 4 - Artist D" },
    { id: 5, name: "Song 4 - Artist D" },
    { id: 98, name: "Song 4 - Artist D" },
    { id: 5, name: "Song 5 - Artist E" },
  ];

  const toggleAudio = (audio) => {
    setSelectedAudios((prev) =>
      prev.some((a) => a.id === audio.id)
        ? prev.filter((a) => a.id !== audio.id)
        : [...prev, audio]
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          Create Playlist
        </motion.button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md bg-gradient-to-br from-gray-50 to-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-gray-800">
            Create New Playlist
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Craft your perfect playlist by adding a name and selecting your
            favorite tracks.
          </AlertDialogDescription>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="playlist-name"
                className="text-sm font-medium text-gray-700"
              >
                Playlist Name
              </label>
              <Input
                id="playlist-name"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                Select Audio Tracks:
              </h4>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white">
                {dummyAudios.map((audio) => (
                  <motion.div
                    key={audio.id}
                    className={`flex items-center justify-between p-3 cursor-pointer ${
                      selectedAudios.some((a) => a.id === audio.id)
                        ? "bg-purple-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleAudio(audio)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-gray-700">{audio.name}</span>
                    {selectedAudios.some((a) => a.id === audio.id) && (
                      <Check className="h-5 w-5 text-purple-500" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedAudios.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2 h-24 overflow-y-auto"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    Selected Tracks:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAudios.map((audio) => (
                      <motion.div
                        key={audio.id}
                        className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        {audio.name}
                        <X
                          className="h-4 w-4 ml-2 cursor-pointer text-purple-600 hover:text-purple-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAudio(audio);
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            disabled={!playlistName || selectedAudios.length === 0}
          >
            Create Playlist
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePlaylistAlert;
