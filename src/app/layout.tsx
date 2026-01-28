import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: {
    default: "케이텍 - 산업용 에어컴프레서 전문기업 | KTECH",
    template: "%s | 케이텍 KTECH",
  },
  description: "산업용 에어컴프레서 전문 제조기업 케이텍입니다. 스크류 컴프레서, 오일프리 컴프레서, 에어드라이어 등 다양한 제품을 제공합니다.",
  keywords: ["에어컴프레서", "스크류 컴프레서", "산업용 컴프레서", "오일프리 컴프레서", "에어드라이어", "KTECH", "케이텍"],
  authors: [{ name: "KTECH" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "KTECH 케이텍",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
