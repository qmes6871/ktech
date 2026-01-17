import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객지원 | KTECH',
  description: '케이텍 고객지원 센터입니다. 제품 문의, 견적 요청, 기술 지원 등 다양한 문의를 남겨주세요.',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
