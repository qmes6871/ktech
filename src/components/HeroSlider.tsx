'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const heroImages = [
  '/ktech/images/hero/1.png',
  '/ktech/images/hero/2.png',
  '/ktech/images/hero/3.jpg',
  '/ktech/images/hero/4.jpg',
  '/ktech/images/hero/5.jpg',
  '/ktech/images/hero/6.jpg',
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  // 첫 번째 이미지 애니메이션 즉시 시작
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsZooming(true);
    }, 100);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsZooming(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setIsZooming(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-[6000ms] ease-out ${
              index === currentIndex && isZooming ? 'scale-110' : 'scale-100'
            }`}
          >
            <Image
              src={src}
              alt={`KTECH 배경 ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      ))}

      {/* Gradient Overlay - Darker */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsZooming(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsZooming(true);
              }, 100);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
