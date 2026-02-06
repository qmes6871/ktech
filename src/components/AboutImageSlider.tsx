'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const companyImages = [
  '/ktech/images/company/company-view-1.jpg',
  '/ktech/images/company/company-view-2.jpg',
  '/ktech/images/company/company-view-3.jpg',
];

export function AboutImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companyImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {companyImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`KTECH 회사 전경 ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {companyImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-5'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`이미지 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
