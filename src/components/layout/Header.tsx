'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navigation = [
  {
    name: '기업정보',
    href: '/about',
    children: [
      { name: '회사소개', href: '/about' },
      { name: '연혁', href: '/about/history' },
      { name: '인증 및 특허', href: '/about/certifications' },
    ],
  },
  {
    name: '제품소개',
    href: '/products',
    children: [
      { name: '와이퍼 어셈블리', href: '/products?category=wiper-assembly' },
      { name: '와이어링 하네스 및 케이블', href: '/products?category=wiring-harness' },
      { name: '에어컴프레서', href: '/products?category=air-compressor' },
      { name: '연료센서', href: '/products?category=fuel-sensor' },
      { name: '사이렌앰프 및 램프', href: '/products?category=siren-amp' },
      { name: '액세서리', href: '/products?category=accessories' },
    ],
  },
  { name: '제품개발', href: '/development' },
  { name: '고객지원', href: '/support' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <nav className="container mx-auto px-2 sm:px-6 lg:px-8">
        {/* Mobile: h-16 (64px), Desktop: h-24 (96px) */}
        <div className="flex h-16 lg:h-24 justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-3 sm:ml-0">
            <Link href="/" className="flex items-center">
              <div className="relative h-14 w-52 sm:h-14 sm:w-52 lg:h-20 lg:w-64">
                <Image
                  src="/ktech/images/logo/ktech-logo.jpg"
                  alt="KTECH 로고"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  {item.name}
                  {item.children && (
                    <svg className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-3 min-w-[220px] overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-600 transition-all duration-200"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25"
            >
              문의하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button - larger touch target */}
          <div className="lg:hidden">
            <button
              type="button"
              className="p-3 -mr-2 rounded-xl transition-colors text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">메뉴 열기</span>
              {mobileMenuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full screen overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-50 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              {/* Navigation Items */}
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          className="w-full text-left text-gray-900 font-semibold py-4 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between text-lg"
                          onClick={() =>
                            setMobileOpenSubmenu(mobileOpenSubmenu === item.name ? null : item.name)
                          }
                        >
                          {item.name}
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                              mobileOpenSubmenu === item.name ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileOpenSubmenu === item.name && (
                          <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-blue-200 bg-gray-50 rounded-r-xl">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block text-gray-700 py-3.5 px-5 text-base hover:text-blue-600 hover:bg-blue-50 rounded-r-xl transition-colors active:bg-blue-100"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-gray-900 font-semibold py-4 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/support"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-500/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  문의하기
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-5 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-500 mb-3">빠른 상담</p>
                <a href="tel:042-000-0000" className="flex items-center gap-3 text-gray-900 font-semibold text-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  042-000-0000
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
