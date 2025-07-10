// import React, { useRef } from 'react';
// import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css'; // Import default styles

// interface CarouselProps {
//   slides?: React.ReactNode[];
// }

const Carousel: React.FC<CarouselProps> = ({ slides = [] }) => {
  // const progressBarRef = useRef<HTMLDivElement>(null);
  // const splideOptions: SplideProps['options'] = {
  //   type: 'slide',
  //   perPage: 1,
  //   rewind: true,
  //   gap: '1rem',
  //   pagination: false,
  //   arrows: true,
  // };

  const onMoved = (splide: any) => {
    const end = splide.Components.Controller.getEnd() + 1;
    const rate = Math.min((splide.index + 1) / end, 1);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${100 * rate}%`;
    }
  };

  return (
    <div className="carousel-container">
      {/* <Splide
        options={splideOptions}
        onMoved={onMoved}
        onMounted={onMoved}
        aria-label="Image Carousel"
      >
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SplideSlide key={index}>{slide}</SplideSlide>
          ))
        ) : (
          <>
            <SplideSlide>Slide 01</SplideSlide>
            <SplideSlide>Slide 02</SplideSlide>
            <SplideSlide>Slide 03</SplideSlide>
          </>
        )}
      </Splide> */}

      <div className="my-slider-progress">
        <div className="my-slider-progress-bar" ref={progressBarRef}></div>
      </div>

      {/* <style jsx>{`
        .carousel-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .my-slider-progress {
          background: #ccc;
          margin-top: 1rem;
        }

        .my-slider-progress-bar {
          background: greenyellow;
          height: 2px;
          transition: width 400ms ease;
          width: 0;
        }
      `}</style> */}
    </div>
  );
};

export default Carousel;
