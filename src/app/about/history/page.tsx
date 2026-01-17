'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard } from '@/components/animations/AnimatedSection';

const historyData = [
  {
    year: '현재',
    title: '글로벌 파트너십 강화',
    events: [
      '한국·중국 생산 거점 운영',
      'ISO 9001 품질경영시스템 인증',
      'ISO 14001 환경경영시스템 인증',
      '글로벌 OEM 파트너 납품',
    ],
    highlight: true,
  },
  {
    year: '2019',
    title: '사업 확장',
    events: [
      '㈜케이텍(KTECH) 법인명 변경',
      '건설기계 부품 사업 본격화',
    ],
  },
  {
    year: '2015',
    title: '기술력 강화',
    events: [
      '와이어링 하네스 생산라인 증설',
      '품질관리 시스템 고도화',
    ],
  },
  {
    year: '2010',
    title: '시장 확대',
    events: [
      '산업차량 부품 시장 진출',
      '국내 주요 OEM 납품 시작',
    ],
  },
  {
    year: '2007',
    title: '생산 시설 확충',
    events: [
      '중국 공장 생산라인 증설',
      '에어컴프레서 제품군 추가',
    ],
  },
  {
    year: '2004',
    title: '한국 본사 설립',
    events: [
      '㈜경복산전(한국 본사) 설립',
      '국내 영업 및 기술지원 체계 구축',
    ],
  },
  {
    year: '1998',
    title: '회사 설립',
    events: [
      '중국 장쑤성 창저우에 경복기전유한공사 설립',
      '건설기계·산업차량 부품 제조 시작',
    ],
    isFirst: true,
  },
];

export default function HistoryPage() {
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
              연혁
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 font-light"
            >
              30년간의 성장과 혁신의 여정
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
            {[
              { value: '30+', label: 'Years of Experience' },
              { value: '2', label: 'Production Sites' },
              { value: 'ISO', label: 'Certified Quality' },
              { value: '100+', label: 'Global Partners' },
            ].map((stat, index) => (
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
              KTECH의 새로운 역사를 함께 만들어가세요
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              30년의 경험과 기술력을 바탕으로 고객과 함께 성장합니다.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  회사 소개
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
