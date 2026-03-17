'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { name: t('nav.companyInfo'), href: '/about' },
      { name: t('nav.history'), href: '/about/history' },
      { name: t('nav.certifications'), href: '/about/certifications' },
      { name: t('nav.privacyPolicy'), href: '/privacy' },
    ],
    esg: [
      { name: t('nav.esgPolicy'), href: '/esg' },
      { name: t('nav.environment'), href: '/esg/environment' },
      { name: t('nav.social'), href: '/esg/social' },
      { name: t('nav.governance'), href: '/esg/governance' },
    ],
    support: [
      { name: t('nav.technology'), href: '/development' },
      { name: t('nav.support'), href: '/support' },
      { name: t('common.contact'), href: '/support' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">KTECH</h3>
            <div className="space-y-4">
              <div>
                <p className="text-blue-400 text-sm font-semibold mb-1">{t('footer.koreaOffice')}</p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('footer.address')}
                </p>
              </div>
              <div>
                <p className="text-blue-400 text-sm font-semibold mb-1">{t('footer.chinaOffice')}</p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('footer.chinaAddress')}
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">{t('nav.about')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ESG Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">{t('nav.esg')}</h3>
            <ul className="space-y-3">
              {footerLinks.esg.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="overflow-hidden">
            <h3 className="text-white font-semibold mb-5">{t('footer.contactUs')}</h3>
            <div className="space-y-4 text-gray-400">
              {/* Korea Office */}
              <div>
                <p className="text-blue-400 text-xs font-semibold mb-2">{t('footer.koreaOffice')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[11px] sm:text-xs">
                      {t('footer.address')}<br />
                      {t('footer.postalCode')}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[11px] sm:text-xs">Tel. +82-42-931-9031<br />Fax. +82-42-931-9034</span>
                  </li>
                </ul>
              </div>
              {/* China Office */}
              <div>
                <p className="text-blue-400 text-xs font-semibold mb-2">{t('footer.chinaOffice')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[11px] sm:text-xs break-words">
                      {t('footer.chinaAddress')}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[11px] sm:text-xs">Tel. +86-519-8586-9129<br />Fax. +86-519-8512-3113</span>
                  </li>
                </ul>
              </div>
              {/* Email */}
              <li className="flex items-center gap-2 list-none">
                <svg className="h-4 w-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[11px] sm:text-xs">info@ktech.co.kr</span>
              </li>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} KTECH. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('support.form.privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
