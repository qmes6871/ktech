'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AnimatedSection,
  AnimatedCard,
} from '@/components/animations/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ESGPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
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
              <span className="w-12 h-[2px] bg-green-400"></span>
              <span className="text-green-400 font-semibold tracking-wider text-sm">{t('esgPage.badge')}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t('esgPage.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-green-100 font-light leading-relaxed"
            >
              {t('esgPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ESG Policy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-12 h-[2px] bg-green-600"></span>
                  <span className="text-green-600 font-semibold tracking-wider text-sm">ESG POLICY</span>
                  <span className="w-12 h-[2px] bg-green-600"></span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('esgPage.policyTitle')}</h2>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg">
                <div className="text-lg text-gray-700 leading-relaxed space-y-2 text-center">
                  <p>{t('esgPage.policyDesc1')}</p>
                  <p>{t('esgPage.policyDesc2')}</p>
                  <p>{t('esgPage.policyDesc3')}</p>
                  <p>{t('esgPage.policyDesc4')}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* E. Environmental Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('esgPage.environmentTitle')}</h2>
                <p className="text-green-600 font-medium">{t('esgPage.environmentSubtitle')}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1 */}
            <AnimatedCard index={0}>
              <div className="bg-white rounded-3xl p-8 border border-green-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.environmentSection1Title')}</h3>
                <p className="text-sm text-gray-600 mb-4">{t('esgPage.environmentSection1Desc')}</p>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.environmentSection1Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 2 */}
            <AnimatedCard index={1}>
              <div className="bg-white rounded-3xl p-8 border border-green-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.environmentSection2Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.environmentSection2Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 3 */}
            <AnimatedCard index={2}>
              <div className="bg-white rounded-3xl p-8 border border-green-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.environmentSection3Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.environmentSection3Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* S. Social Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('esgPage.socialTitle')}</h2>
                <p className="text-blue-600 font-medium">{t('esgPage.socialSubtitle')}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1 */}
            <AnimatedCard index={0}>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.socialSection1Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.socialSection1Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 2 */}
            <AnimatedCard index={1}>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.socialSection2Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.socialSection2Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 3 */}
            <AnimatedCard index={2}>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.socialSection3Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.socialSection3Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* G. Governance Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('esgPage.governanceTitle')}</h2>
                <p className="text-indigo-600 font-medium">{t('esgPage.governanceSubtitle')}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1 */}
            <AnimatedCard index={0}>
              <div className="bg-white rounded-3xl p-8 border border-indigo-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.governanceSection1Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.governanceSection1Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 2 */}
            <AnimatedCard index={1}>
              <div className="bg-white rounded-3xl p-8 border border-indigo-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.governanceSection2Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.governanceSection2Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>

            {/* Section 3 */}
            <AnimatedCard index={2}>
              <div className="bg-white rounded-3xl p-8 border border-indigo-100 hover:shadow-xl transition-shadow h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('esgPage.governanceSection3Title')}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{t(`esgPage.governanceSection3Item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Supplier Code of Conduct Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-10 md:p-14 shadow-lg border border-amber-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('esgPage.supplierCodeTitle')}</h2>
                    <p className="text-sm text-gray-500">{t('esgPage.supplierCodeSubtitle')}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  {t('esgPage.supplierCodeDesc')}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-600">{t(`esgPage.supplierCodeItem${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('esgPage.ctaTitle')}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
              {t('esgPage.ctaDesc')}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors"
                >
                  {t('aboutPage.contactUs')}
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
