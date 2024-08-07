import { useState, useEffect } from "react";
import Image from "next/image";

const WaveformVisualizer = () => {
  const [bars, setBars] = useState(Array(50).fill(25));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(() => Math.random() * 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end h-24 gap-[2px] overflow-hidden">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
          style={{ height: `${height}%`, transition: "height 0.1s ease" }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Cosmic Rhythms",
    artist: "Stellar Beats",
    album: "Galactic Grooves",
    cover: "/images/album-cover.jpg",
  });

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev + 1) % 101);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  p-8">
      <div className="w-full max-w-4xl relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-orange-500/30 backdrop-blur-xl" />

        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animate-pulse">
            Now Playing
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={currentTrack.cover}
                alt={`${currentTrack.title} cover`}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {currentTrack.title}
                </h2>
                <p className="text-xl text-gray-300">{currentTrack.artist}</p>
                <p className="text-sm text-gray-400">{currentTrack.album}</p>
              </div>

              <WaveformVisualizer />

              <div className="flex items-center justify-between">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>
                    {Math.floor((progress * 3.5) / 100)}:
                    {((progress * 3.5) % 100).toString().padStart(2, "0")}
                  </span>
                  <span>3:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
