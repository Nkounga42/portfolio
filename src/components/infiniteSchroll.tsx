import { useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const InfiniteScroll = ({ items }: { items: string[] }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const speed = 0.05;
  const cardWidth = 200;
  const gap = 10;
  const totalWidth = items.length * (cardWidth + gap);

  useAnimationFrame((_, delta) => {
    if (!isHovered) {
      setOffsetX((prev) => prev - delta * speed);
    }
  });

  const translateX = offsetX % totalWidth;

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div
        style={{
          display: "flex",
          gap: `${gap}px`,
          transform: `translateX(${translateX}px)`,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: `${cardWidth}px`,
              height: "120px",
              backgroundColor: "#4b1616ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;