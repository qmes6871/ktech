'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroSlider } from '@/components/HeroSlider';
import { CertificateSlider } from '@/components/CertificateSlider';
import {
  AnimatedSection,
  AnimatedText,
  AnimatedCard,
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations/AnimatedSection';

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Modern with gradient overlay */}
      <section className="relative min-h-[100vh] flex items-center">
        <HeroSlider />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <span className="text-xs md:text-sm font-medium tracking-wider">INDUSTRIAL EQUIPMENT SPECIALIST</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
            >
              기술로 현장을
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                완성하는 기업
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
            >
              산업장비의 품질·안전·생산성을 높이는 핵심 파트너,<br className="hidden md:block" />
              KTECH 방문을 진심으로 환영합니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 md:px-0"
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold text-sm md:text-base hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                제품 둘러보기
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-sm md:text-base border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                회사소개
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], height: ['8px', '12px', '8px'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 bg-white/70 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Quality · Technology · Commitment Section - Modern glassmorphism */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedText delay={0}>
                <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                  <span className="w-8 md:w-12 h-[2px] bg-blue-600"></span>
                  <span className="text-blue-600 font-semibold tracking-wider text-xs md:text-sm">Quality · Technology · Commitment</span>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  품질 · 기술력 ·<br />
                  <span className="text-blue-600">고객중심의 신뢰</span>
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    당사는 검증된 제조 경험을 바탕으로
                    품질 관리, OEM 대응형 기술 고도화,
                    그리고 공급망 안정성을 책임지는 장기적 파트너십을 제공합니다.
                  </p>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <Link
                  href="/about"
                  className="group inline-flex items-center mt-6 md:mt-8 text-blue-600 font-semibold text-base md:text-lg hover:text-blue-700 transition-colors"
                >
                  자세히 알아보기
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimatedText>
            </div>
            <AnimatedSection direction="right" delay={0.2} className="order-1 lg:order-2 relative">
              <div className="relative h-[280px] sm:h-[350px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/ktech/images/company/construction-site.png"
                  alt="KTECH 장비"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card - hidden on small mobile */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="hidden sm:block absolute -bottom-4 md:-bottom-6 -left-2 md:-left-6 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg md:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">30+</p>
                    <p className="text-gray-500 text-xs md:text-sm">Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* KTECH이 선택받는 이유 Section - Modern cards */}
      <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-12 h-[2px] bg-blue-400"></span>
              <span className="text-blue-400 font-semibold tracking-wider text-sm">KTECH KEY STRENGTHS</span>
              <span className="w-12 h-[2px] bg-blue-400"></span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              KTECH이 선택받는 이유
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              산업·건설 장비 현장에서 요구되는 성능, 내구성, 안전성을 기준으로<br className="hidden md:block" />
              설계부터 생산, 품질 검증의 전 공정을 일관된 기준으로 관리하고 있습니다.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item 1 */}
            <AnimatedCard index={0}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30"
                  >
                    01
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                      검증된 제조 경험과 韓·中 생산 운영 역량
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      30년 이상 한국과 중국에서 축적된 공장 운영 경험을 바탕으로, 실제 생산 현장에서 검증된 제조 노하우와 안정적인 공급 역량을 보유하고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Item 2 */}
            <AnimatedCard index={1}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/30"
                  >
                    02
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                      핵심 부품에 특화된 품질 관리와 신뢰성 중심 구조
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      와이퍼 모터, 연료 센서, 에어 컴프레서, 사이렌앰프 및 램프, 와이어링 하네스 및 케이블 등 장비 신뢰도에 직결되는 핵심 부품 분야에서 자체 품질 관리 체계와 검증 프로세스를 기반으로 안정성을 확보하고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Item 3 */}
            <AnimatedCard index={2}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-400/30"
                  >
                    03
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                      OEM 요구에 대응하는 단계적 기술 고도화 역량
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      단순 부품 공급을 넘어 장비 제어 구조와 시스템 연계를 이해하는 기술 파트너로서 전기·전자 부품 설계 역량과 기술 고도화를 단계적으로 추진하고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Item 4 */}
            <AnimatedCard index={3}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30"
                  >
                    04
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                      공급망 안정성을 책임지는 장기 파트너십 지향
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      일관된 품질과 안정적인 공급 체계를 기반으로, 고객의 장비·시스템 환경에 맞춘 맞춤형 기술 발전을 통해 단기 거래가 아닌 장기 협력 관계를 지향합니다.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* KTECH 인증서 Section - Modern minimal */}
      <section id="certificates" className="py-16 md:py-24 bg-white relative overflow-hidden scroll-mt-24">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 origin-left"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-12 h-[2px] bg-blue-600"></span>
              <span className="text-blue-600 font-semibold tracking-wider text-sm">CERTIFICATIONS</span>
              <span className="w-12 h-[2px] bg-blue-600"></span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">KTECH 인증서</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              KTECH은 처음 설계부터 생산·검사·유지관리까지<br className="hidden md:block" />
              국제 품질 기준에 기반한 종합적인 품질 관리 체계를 운영하고 있습니다.
            </p>
          </AnimatedSection>

          {/* Certificate Infinite Slider */}
          <FadeIn delay={0.3}>
            <CertificateSlider />
          </FadeIn>
        </div>
      </section>

      {/* CTA Section - Modern gradient */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              함께 성장할 파트너를 찾고 계신가요?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              KTECH의 전문가들이 귀사의 요구사항에 맞는 최적의 솔루션을 제안해 드립니다.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/support"
                className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl shadow-black/20"
              >
                문의하기
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
