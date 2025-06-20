"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImage } from "../product-image/ProductImage";
import "./slideshow.css";

interface ProductMobileSlideShowProps {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductMobileSlideShow({
  images,
  title,
  className,
}: ProductMobileSlideShowProps) {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{ delay: 3500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={600}
              height={500}
              src={`${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
