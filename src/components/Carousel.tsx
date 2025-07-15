// import React, { useRef } from 'react';
// import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css'; // Import default styles

import { useRef } from "react";

interface CarouselProps {
  slides?: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const splideOptions= {
    type: 'slide',
    perPage: 1,
    rewind: true,
    gap: '1rem',
    pagination: false,
    arrows: true,
  };

  // const onMoved = (splide: any) => {
  //   const end = splide.Components.Controller.getEnd() + 1;
  //   const rate = Math.min((splide.index + 1) / end, 1);
  //   if (progressBarRef.current) {
  //     progressBarRef.current.style.width = `${100 * rate}%`;
  //   }
  // };

  return (
    <div className="carousel-container"> 

      <div className="my-slider-progress">
        <div className="my-slider-progress-bar" 
        {...splideOptions}
        // onMoved={onMoved}
        // onMounted={onMoved}
        aria-label="Image Carousel"
        ref={progressBarRef}></div>
      </div>

 
    </div>
  );
};

export default Carousel;
