'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AnimatedSection,
  AnimatedText,
  AnimatedCard,
} from '@/components/animations/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
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
              <span className="text-blue-400 font-semibold tracking-wider text-sm">ABOUT US</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              회사 소개
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 font-light"
            >
              산업·건설기계 핵심 부품 제조 파트너
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="prose prose-lg max-w-none">
                <AnimatedText delay={0}>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <span className="text-blue-600 font-semibold">1998년 설립 이후</span>, 저희 케이텍(KTECH)은 건설기계 및 산업차량에 필요한 주요 부품 생산 조달 분야에서 높은 신뢰와 기술력을 기반으로 꾸준히 성장해 왔습니다.
                  </p>
                </AnimatedText>
                <AnimatedText delay={0.1}>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    지난 <span className="text-blue-600 font-semibold">30여 년간 한국과 중국</span>에서 축적한 공장 운영 경험을 바탕으로, 신속하고 안정적인 원자재 아웃소싱 역량과 효율적인 생산·공급 시스템을 구축해왔습니다. 이러한 역량은 안정된 품질을 보장함과 동시에, 고객의 다양한 요구를 충족시키는 확고한 경쟁력이 되고 있습니다.
                  </p>
                </AnimatedText>
                <AnimatedText delay={0.2}>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    저희는 경쟁이 치열해지는 OEM 시장에서 더욱 안정적이고 지속적인 <span className="text-blue-600 font-semibold">품질·원가·납기 경쟁력</span>을 확보하기 위해 일관된 노력을 기울여 왔습니다. 고객이 요청하는 제품 개발, 설계, 샘플 제작, 인증 시험의 전 과정에서 수십 년간 축적된 경험을 바탕으로 신속하고 효율적인 결과로 보답하고 있습니다.
                  </p>
                </AnimatedText>
              </div>
            </div>
            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/ktech/images/company/construction-site.png"
                  alt="KTECH 사업장"
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl"
              >
                <p className="text-4xl font-bold">30+</p>
                <p className="text-blue-100">Years of Excellence</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-10 md:p-14 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">우리의 약속</h2>
                </div>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    또한 전 생산 품목의 품질 향상과 원가 경쟁력 강화를 위해 지속적으로 새로운 방안을 모색하고 있으며, 책임 있는 품질관리체계를 통해 <span className="text-blue-600 font-semibold">고객이 신뢰하는 이름, 고객의 공급망 안정성을 책임지는 파트너</span> 케이텍(KTECH)으로 성장해 나가겠습니다.
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    앞으로도 변함없는 전문성으로 가장 신뢰받는 산업·건설기계 부품 파트너가 되겠습니다.
                  </p>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <p className="text-gray-500 mb-2">감사합니다.</p>
                  <p className="text-xl font-bold text-gray-900">㈜케이텍(KTECH) 임직원 일동</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-12 h-[2px] bg-blue-600"></span>
              <span className="text-blue-600 font-semibold tracking-wider text-sm">CORE VALUES</span>
              <span className="w-12 h-[2px] bg-blue-600"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">핵심 가치</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard index={0}>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-shadow h-full">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">품질 (Quality)</h3>
                <p className="text-gray-600">
                  엄격한 품질 관리 시스템을 통해 최고 품질의 제품만을 고객에게 제공합니다.
                </p>
              </div>
            </AnimatedCard>
            <AnimatedCard index={1}>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 hover:shadow-xl transition-shadow h-full">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">기술력 (Technology)</h3>
                <p className="text-gray-600">
                  끊임없는 기술 개발과 혁신으로 산업의 미래를 선도합니다.
                </p>
              </div>
            </AnimatedCard>
            <AnimatedCard index={2}>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-shadow h-full">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">신뢰 (Trust)</h3>
                <p className="text-gray-600">
                  고객과의 약속을 지키고, 장기적인 파트너십을 구축합니다.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
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
              KTECH과 함께하세요
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              30년 이상의 경험과 기술력으로 최적의 솔루션을 제공합니다.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/about/history"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  연혁 보기
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  문의하기
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
