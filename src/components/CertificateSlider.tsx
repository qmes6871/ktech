'use client';

import Image from 'next/image';

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
];

export function CertificateSlider() {
  // 무한 루프를 위해 배열 복제
  const duplicatedCerts = [...certificates, ...certificates];

  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll">
        {duplicatedCerts.map((cert, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 mx-3 bg-gray-50 p-3 rounded-lg"
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={180}
              height={250}
              className="rounded w-full h-auto"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
