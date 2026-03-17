'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  { src: '/ktech/images/certificates/5e5afa96a1d44457e3387fc86ac62ff2PCx5VkNvPLzpzTjk-0.jpg', alt: '환경경영시스템 인증서' },
  { src: '/ktech/images/certificates/5e5afa96a1d44457e3387fc86ac62ff2PCx5VkNvPLzpzTjk-1.jpg', alt: '환경경영시스템 인증서 2' },
  { src: '/ktech/images/certificates/785314bbd2644f959519ab4e81298dedZ3KIZFtP2cBJbLGT-0.jpg', alt: 'ISO 인증서' },
  { src: '/ktech/images/certificates/785314bbd2644f959519ab4e81298dedZ3KIZFtP2cBJbLGT-1.jpg', alt: 'ISO 인증서 2' },
  { src: '/ktech/images/certificates/a12d9786ce4a43f2913db704224dfb7aNnLK5g2Fg9cKGwcA-0.jpg', alt: '품질경영시스템 인증서' },
  { src: '/ktech/images/certificates/a12d9786ce4a43f2913db704224dfb7aNnLK5g2Fg9cKGwcA-1.jpg', alt: '품질경영시스템 인증서 2' },
  { src: '/ktech/images/certificates/a12d9786ce4a43f2913db704224dfb7aNnLK5g2Fg9cKGwcA-2.jpg', alt: '품질경영시스템 인증서 3' },
  { src: '/ktech/images/certificates/a12d9786ce4a43f2913db704224dfb7aNnLK5g2Fg9cKGwcA-3.jpg', alt: '품질경영시스템 인증서 4' },
  { src: '/ktech/images/certificates/a12d9786ce4a43f2913db704224dfb7aNnLK5g2Fg9cKGwcA-4.jpg', alt: '품질경영시스템 인증서 5' },
  { src: '/ktech/images/certificates/이노비즈확인서-20250613_1.jpg', alt: '이노비즈 확인서' },
  { src: '/ktech/images/certificates/디자인등록증-20251124-1.jpg', alt: '디자인등록증 1' },
  { src: '/ktech/images/certificates/디자인등록증-20251124-2.jpg', alt: '디자인등록증 2' },
  { src: '/ktech/images/certificates/디자인등록증-20251124-3.jpg', alt: '디자인등록증 3' },
  { src: '/ktech/images/certificates/디자인등록증-20251124-4.jpg', alt: '디자인등록증 4' },
  { src: '/ktech/images/certificates/디자인등록증-20251124-5.jpg', alt: '디자인등록증 5' },
];

const ITEM_WIDTH = 192 + 24; // w-48 (192px) + mx-3 (24px)

export function CertificateSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // 무한 루프를 위해 배열 복제
  const duplicatedCerts = [...certificates, ...certificates];

  // 수동 이동 함수
  const moveSlider = useCallback((direction: 'prev' | 'next') => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsManualMode(true);

    const moveAmount = direction === 'next' ? ITEM_WIDTH : -ITEM_WIDTH;
    let newPosition = positionRef.current + moveAmount;

    const halfWidth = scrollContainer.scrollWidth / 2;

    // 무한 루프 처리
    if (newPosition >= halfWidth) {
      newPosition = newPosition - halfWidth;
    } else if (newPosition < 0) {
      newPosition = halfWidth + newPosition;
    }

    positionRef.current = newPosition;
    scrollContainer.style.transition = 'transform 0.3s ease-out';
    scrollContainer.style.transform = `translateX(-${newPosition}px)`;

    // 트랜지션 후 자동 스크롤 재개 타이머
    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.style.transition = '';
      }
      // 3초 후 자동 스크롤 재개
      setTimeout(() => {
        setIsManualMode(false);
      }, 3000);
    }, 300);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const speed = 0.5; // 픽셀/프레임

    const animate = () => {
      if (!isHovered && !isManualMode) {
        positionRef.current += speed;
        const halfWidth = scrollContainer.scrollWidth / 2;

        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }

        scrollContainer.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered, isManualMode]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <>
      <div className="relative group/slider">
        {/* 좌측 화살표 버튼 */}
        <button
          onClick={() => moveSlider('prev')}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 active:bg-gray-100 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
          aria-label="이전 인증서"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 우측 화살표 버튼 */}
        <button
          onClick={() => moveSlider('next')}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 active:bg-gray-100 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
          aria-label="다음 인증서"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex will-change-transform"
            style={{ transform: 'translateX(0)' }}
          >
            {duplicatedCerts.map((cert, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 mx-3 bg-gray-50 p-3 rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(cert)}
              >
                <div className="relative overflow-hidden rounded">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={180}
                    height={250}
                    className="rounded w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[90vh] w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 이미지 */}
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={1100}
                  className="max-h-[80vh] w-auto object-contain rounded"
                />
                <p className="text-center text-gray-700 mt-3 font-medium">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
