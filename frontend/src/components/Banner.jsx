import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://media.istockphoto.com/id/687611810/photo/view-at-annapurna-mountain-range-and-its-reflection-in-phewa-lake-in-pokhara-nepal.jpg?s=1024x1024&w=is&k=20&c=-fze0BDAWujKdN9hjFYchWw9gejwQonTdreKulzV8JU=", 
  "https://media.istockphoto.com/id/1093691796/photo/monkeys-around-monkey-temple.jpg?s=1024x1024&w=is&k=20&c=3DhL6JdBXe9sC_CX6Ri2QegsSLP0KO-8M44Cjeyb-nI=",
  "https://media.istockphoto.com/id/907767796/photo/group-tourists-with-backpacks-descends-down-on-mountain-trail-during-hike.jpg?s=1024x1024&w=is&k=20&c=9a3EPtLqluZccIKYgzWOeKTtBijciKzOdBQ-Q31yXVE=",
  "https://media.istockphoto.com/id/590073644/photo/nepali-couple-in-front-of-their-house.jpg?s=1024x1024&w=is&k=20&c=kb_rch4B_8rvDckTax94lgLI56r3-qSTq1-lfDcnv-o=",
  "https://media.istockphoto.com/id/173573049/photo/indian-rhino-bull.jpg?s=1024x1024&w=is&k=20&c=AQ4eW4hPV6hf2uxFjeA7q0tAoqJkbGqcQwCYuZodFvI=",
  "https://media.istockphoto.com/id/1758046033/photo/a-royal-bengal-tiger-on-a-dirt-road-in-the-jungle-in-chitwan-national-park-in-nepal.jpg?s=1024x1024&w=is&k=20&c=9xs902vIvrsLd9_eNSq6DUfEILgZ4SP8U5HxZPk_bC0="
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden mt-2"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <AnimatePresence>
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="Nepal Scenery"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400 opacity-70"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
