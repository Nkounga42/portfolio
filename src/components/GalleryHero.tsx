import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface Card {
  url: string;
  label: string;
  color: string;
  rot: number;
  tx: number;
  ty: number;
  z: number;
}

const cards: Card[] = [
  {
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=380&fit=crop",
    label: "Digital Art",
    color: "#6366f1",
    rot: -28,
    tx: -290,
    ty: -20,
    z: 1
  },
  {
    url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&h=380&fit=crop",
    label: "Abstract",
    color: "#8b5cf6",
    rot: -17,
    tx: -185,
    ty: -20,
    z: 2
  },
  {
    url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=380&fit=crop",
    label: "Nature",
    color: "#06b6d4",
    rot: -7,
    tx: -80,
    ty: -20,
    z: 3
  },
  {
    url: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=380&fit=crop",
    label: "Portrait",
    color: "#10b981",
    rot: 3,
    tx: 25,
    ty: -20,
    z: 4
  },
  {
    url: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?w=300&h=380&fit=crop",
    label: "Urban",
    color: "#f59e0b",
    rot: 13,
    tx: 135,
    ty: -20,
    z: 5
  },
  {
    url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=380&fit=crop",
    label: "Minimal",
    color: "#ef4444",
    rot: 22,
    tx: 245,
    ty: -20,
    z: 6
  },
  {
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=380&fit=crop",
    label: "",
    color: "",
    rot: 31,
    tx: 340,
    ty: -20,
    z: 7
  },
];

interface ArtCardProps {
  card: Card;
  children?: React.ReactNode;
  cardIndex: number;
  cards: Card[];
  imageSource: string;
}

function ArtCard({ card, children, cardIndex, cards, imageSource }: ArtCardProps) {
  const [hovered, setHovered] = useState(false);

  const middleIndex = Math.floor(cards.length / 2);
  const offset = cardIndex - middleIndex;

  const ty_value = cardIndex < middleIndex ? card.ty - offset * 20 : card.ty + offset * 20
  const tx_value = cardIndex < middleIndex ? card.tx + offset * 3 : card.tx + offset * 3

  const evaluateTransformY = () => {
    return ty_value;
  };

  const evaluateTransformX = () => {
    return tx_value;
  };

  const evaluateHoverTransformY = () => {
    return ty_value - 15;
  };

  const evaluateHoverTransformX = () => {
    return tx_value;
  };



  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute w-36 h-44 rounded-[18px] bg-base-200 overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        transform: `    ${hovered
          ? `translateX(${evaluateHoverTransformX()}px) translateY(${evaluateHoverTransformY()}px) rotate(${card.rot - 0.2}deg `
          : `translateX(${evaluateTransformX()}px)  translateY(${evaluateTransformY()}px) rotate(${card.rot * 0.7}deg `}`,
        boxShadow: hovered
          ? "0 16px 48px rgba(0, 0, 0, 0.38)"
          : "0 8px 32px rgba(0,0,5,0.09)",
      }}
    >
      <div className="  inset-0 z-10">{children}</div>
      <img
        src={imageSource}
        loading="lazy"
        className="w-full h-full object-cover block"
      />
    </div>
  );
}

// TagBubbleProps removed — not used in this component



export default function GalleryHero({ sources }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl pt-20  bg-primary/50 -300 flex flex-col items-center justify-center px-4 py-12 overflow-hidden font-sans">


      {/* Cards stage */}
      <div className="relative w-full max-w-2xl h-56 flex items-center justify-center my-4">

        {cards.map((card, i) => {
          const imageSource = sources[i]?.src || "";

          console.log(imageSource);
          return (
            <ArtCard key={i} card={card} imageSource={imageSource} cardIndex={i} cards={cards} >

            </ArtCard>
          )
        })}
      </div>
      <h1 className="text-5xl md:text-6xl font-light text-base-content my-4 mb-10 text-center leading-tight tracking-tighter max-w-xl mb-4">
        {t.galleryHero.title}
      </h1>

      <p className="text-sm text-base-content/80 text-center max-w-sm leading-relaxed mb-7">
        {t.galleryHero.subtitle}
      </p>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <a
          href="https://pin.it/4ELn4vUwM"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-950 hover:bg-gray-700 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
        >
          {t.galleryHero.pinterest}
        </a>
        <a
          href="https://www.behance.net/exaucnkounga"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
        >
          {t.galleryHero.behance}
        </a>
      </div>

    </div>
  );
}
