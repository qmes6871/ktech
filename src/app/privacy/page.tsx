'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  const articles = [
    {
      title: t('privacyPage.article1Title'),
      desc: t('privacyPage.article1Desc'),
      items: [
        t('privacyPage.article1Item1'),
        t('privacyPage.article1Item2'),
        t('privacyPage.article1Item3'),
        t('privacyPage.article1Item4'),
      ],
    },
    {
      title: t('privacyPage.article2Title'),
      desc: t('privacyPage.article2Desc'),
      items: [
        t('privacyPage.article2Item1'),
        t('privacyPage.article2Item2'),
        t('privacyPage.article2Item3'),
      ],
    },
    {
      title: t('privacyPage.article3Title'),
      desc: t('privacyPage.article3Desc'),
      items: [
        t('privacyPage.article3Item1'),
        t('privacyPage.article3Item2'),
        t('privacyPage.article3Item3'),
        t('privacyPage.article3Item4'),
      ],
    },
    {
      title: t('privacyPage.article4Title'),
      desc: t('privacyPage.article4Desc'),
      exception: t('privacyPage.article4Exception'),
      items: [
        t('privacyPage.article4Item1'),
        t('privacyPage.article4Item2'),
        t('privacyPage.article4Item3'),
      ],
    },
    {
      title: t('privacyPage.article5Title'),
      desc: t('privacyPage.article5Desc'),
    },
    {
      title: t('privacyPage.article6Title'),
      desc: t('privacyPage.article6Desc'),
      items: [
        t('privacyPage.article6Item1'),
        t('privacyPage.article6Item2'),
        t('privacyPage.article6Item3'),
        t('privacyPage.article6Item4'),
      ],
      method: t('privacyPage.article6Method'),
    },
    {
      title: t('privacyPage.article7Title'),
      desc: t('privacyPage.article7Desc'),
      items: [
        t('privacyPage.article7Item1'),
        t('privacyPage.article7Item2'),
      ],
    },
    {
      title: t('privacyPage.article8Title'),
      desc: t('privacyPage.article8Desc'),
      items: [
        t('privacyPage.article8Item1'),
        t('privacyPage.article8Item2'),
        t('privacyPage.article8Item3'),
      ],
    },
    {
      title: t('privacyPage.article9Title'),
      desc: t('privacyPage.article9Desc'),
      items: [
        t('privacyPage.article9Item1'),
        t('privacyPage.article9Item2'),
        t('privacyPage.article9Item3'),
      ],
    },
    {
      title: t('privacyPage.article10Title'),
      desc: t('privacyPage.article10Desc'),
      contacts: [
        {
          office: t('privacyPage.article10Office'),
          name: t('privacyPage.article10Name'),
          position: t('privacyPage.article10Position'),
          phone: t('privacyPage.article10Phone'),
          email: t('privacyPage.article10Email'),
        },
        {
          office: t('privacyPage.article10ChinaOffice'),
          address: t('privacyPage.article10ChinaAddress'),
          phone: t('privacyPage.article10ChinaPhone'),
          fax: t('privacyPage.article10ChinaFax'),
        },
      ],
    },
    {
      title: t('privacyPage.article11Title'),
      desc: t('privacyPage.article11Desc'),
      items: [
        t('privacyPage.article11Item1'),
        t('privacyPage.article11Item2'),
        t('privacyPage.article11Item3'),
        t('privacyPage.article11Item4'),
      ],
    },
    {
      title: t('privacyPage.article12Title'),
      desc: t('privacyPage.article12Desc'),
    },
  ];

  return (
    <div className="pt-16 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-12 h-[2px] bg-blue-400"></span>
              <span className="text-blue-400 font-semibold tracking-wider text-sm">{t('privacyPage.badge')}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t('privacyPage.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 font-light"
            >
              {t('privacyPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <AnimatedSection>
              <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('privacyPage.intro')}
                </p>
                <p className="text-blue-600 font-semibold mt-4">
                  {t('privacyPage.effectiveDate')}
                </p>
              </div>
            </AnimatedSection>

            {/* Articles */}
            <div className="space-y-8">
              {articles.map((article, index) => (
                <AnimatedSection key={index}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span>{article.title}</span>
                    </h2>

                    <div className="ml-11">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {article.desc}
                      </p>

                      {article.exception && (
                        <p className="text-gray-600 leading-relaxed mb-4 italic">
                          {article.exception}
                        </p>
                      )}

                      {article.items && (
                        <ul className="space-y-2">
                          {article.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {article.method && (
                        <p className="text-gray-600 leading-relaxed mt-4 pt-4 border-t border-gray-100">
                          {article.method}
                        </p>
                      )}

                      {article.contacts && (
                        <div className="mt-4 space-y-4">
                          {article.contacts.map((contact, contactIndex) => (
                            <div key={contactIndex} className="bg-gray-50 rounded-xl p-6">
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-gray-900 font-semibold">{contact.office}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contact.name && (
                                  <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-gray-700">{contact.name}</span>
                                  </div>
                                )}
                                {contact.position && (
                                  <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-700">{contact.position}</span>
                                  </div>
                                )}
                                {contact.address && (
                                  <div className="flex items-start gap-3 sm:col-span-2">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-gray-700 text-sm">{contact.address}</span>
                                  </div>
                                )}
                                {contact.phone && (
                                  <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-700">{contact.phone}</span>
                                  </div>
                                )}
                                {contact.fax && (
                                  <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    <span className="text-gray-700">{contact.fax}</span>
                                  </div>
                                )}
                                {contact.email && (
                                  <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-700">{contact.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Last Updated */}
            <AnimatedSection>
              <div className="mt-10 text-center text-gray-500 text-sm">
                {t('privacyPage.lastUpdated')}: 2026-02-23
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
