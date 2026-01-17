'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CertificationsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#certificates');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">인증서 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
