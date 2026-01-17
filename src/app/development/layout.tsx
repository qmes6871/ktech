import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제품개발 | KTECH',
  description: '케이텍의 전기·전자 부품 기술 고도화 및 제품 개발 역량을 소개합니다.',
};

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
