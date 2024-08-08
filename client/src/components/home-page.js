import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";

const HomePage = () => {
  const [homeImage, setHomeImage] = useState("https://images.tv9hindi.com/wp-content/uploads/2024/08/chin-tapak-dum-dum-1.png");
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9); // Default aspect ratio

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-500, 500], [5, -5]);
  const rotateY = useTransform(x, [-500, 500], [-5, 5]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
    };
    img.src = homeImage;
  }, [homeImage]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <div 
      className="w-full h-screen px-10 flex items-center justify-center bg-black overflow-hidden rounded-lg"
      onMouseMove={handleMouse}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          opacity: { duration: 1.5 },
          scale: { duration: 1.5 }
        }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={homeImage}
          alt="Home Page Image"
          className="max-w-full max-h-full object-contain"
          style={{
            width: `min(100%, ${imageAspectRatio * 80}vh)`,
            height: `min(${100 / imageAspectRatio}%, 80vh)`
          }}
        />
      </motion.div>
    </div>
  );
};

export default HomePage;