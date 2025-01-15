import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import poster from  './poster.webp';

// Swiper modules
// import { Pagination, Navigation } from "swiper";

const ImageSlider = () => {
  const images = [
   1,2,3
   
  
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
        
      <Swiper
        
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={poster} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
