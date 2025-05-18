// src/feature/home/section/BannerSection.tsx

'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type BannerSectionProps = {
  images: { imageUrl: string; altText?: string }[];
  isLoading?: boolean;
};

export const BannerSection = ({
  images,
  isLoading = false,
}: BannerSectionProps) => {
  if (isLoading) {
    return (
      <section className='w-full rounded-2xl overflow-hidden'>
        <div className='w-full aspect-[22/9] bg-gray-200 animate-pulse rounded-2xl' />
      </section>
    );
  }

  return (
    <section className='w-full rounded-2xl overflow-hidden'>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className='w-full aspect-[22/9] cursor-pointer'
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className='relative w-full h-full'>
              <Image
                src={img.imageUrl}
                alt={img.altText ?? 'Banner'}
                fill
                className='object-cover'
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
