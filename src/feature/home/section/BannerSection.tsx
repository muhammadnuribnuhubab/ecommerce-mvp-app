// src/feature/home/section/BannerSection.tsx

import Image from 'next/image';

type BannerSectionProps = {
  imageUrl: string;
  altText?: string;
};

export const BannerSection = ({
  imageUrl,
  altText = 'Banner',
}: BannerSectionProps) => {
  return (
    <section className='w-full rounded-2xl overflow-hidden'>
      <div className='relative w-full aspect-[22/9]'>
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className='object-cover'
          priority
        />
      </div>
    </section>
  );
};
