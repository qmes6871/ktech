'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard } from '@/components/animations/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HistoryPage() {
  const { t } = useLanguage();

  const historyData = [
    {
      year: t('historyPage.present'),
      title: t('historyPage.globalPartnership'),
      events: [
        t('historyPage.koreaChina'),
        t('historyPage.iso9001'),
        t('historyPage.iso14001'),
        t('historyPage.globalOem'),
      ],
      highlight: true,
    },
    {
      year: t('historyPage.year2019'),
      title: t('historyPage.businessExpansion'),
      events: [
        t('historyPage.nameChange'),
        t('historyPage.constructionParts'),
      ],
    },
    {
      year: t('historyPage.year2015'),
      title: t('historyPage.techStrength'),
      events: [
        t('historyPage.wiringExpansion'),
        t('historyPage.qualityUpgrade'),
      ],
    },
    {
      year: t('historyPage.year2010'),
      title: t('historyPage.marketExpansion'),
      events: [
        t('historyPage.industrialEntry'),
        t('historyPage.domesticOem'),
      ],
    },
    {
      year: t('historyPage.year2007'),
      title: t('historyPage.facilityExpansion'),
      events: [
        t('historyPage.chinaExpansion'),
        t('historyPage.airCompressor'),
      ],
    },
    {
      year: t('historyPage.year2004'),
      title: t('historyPage.koreaHq'),
      events: [
        t('historyPage.kbEstablished'),
        t('historyPage.domesticSupport'),
      ],
    },
    {
      year: t('historyPage.year1998'),
      title: t('historyPage.companyFounded'),
      events: [
        t('historyPage.chinaFounded'),
        t('historyPage.manufacturingStart'),
      ],
      isFirst: true,
    },
  ];

  const statsData = [
    { value: t('historyPage.statsYears'), label: t('historyPage.statsYearsLabel') },
    { value: t('historyPage.statsSites'), label: t('historyPage.statsSitesLabel') },
    { value: t('historyPage.statsIso'), label: t('historyPage.statsIsoLabel') },
    { value: t('historyPage.statsPartners'), label: t('historyPage.statsPartnersLabel') },
  ];

  return (
    <div className="pt-16 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
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
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"
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
              <span className="text-blue-400 font-semibold tracking-wider text-sm">HISTORY</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t('historyPage.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 font-light"
            >
              {t('historyPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 transform md:-translate-x-1/2 origin-top"
              />

              {/* Timeline Items */}
              <div className="space-y-12">
                {historyData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Year Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring' }}
                      className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                          item.highlight
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 ring-4 ring-blue-100'
                            : item.isFirst
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                            : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}
                      >
                        <span className="text-xs">{item.year}</span>
                      </motion.div>
                    </motion.div>

                    {/* Content Card */}
                    <div
                      className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                        index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                      }`}
                    >
                      <motion.div
                        whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                        transition={{ duration: 0.3 }}
                        className={`bg-white rounded-2xl p-6 shadow-lg border transition-all ${
                          item.highlight
                            ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white'
                            : 'border-gray-100'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.events.map((event, eventIndex) => (
                            <motion.li
                              key={eventIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.1 + eventIndex * 0.05 + 0.3 }}
                              className="flex items-start gap-3"
                            >
                              <svg
                                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                  item.highlight ? 'text-blue-600' : 'text-blue-500'
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-gray-700">{event}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('historyPage.ctaTitle')}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              {t('historyPage.ctaDesc')}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  {t('historyPage.aboutUs')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  {t('historyPage.contactUs')}
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
