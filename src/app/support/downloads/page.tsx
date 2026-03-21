'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface Download {
  id: string;
  category: 'catalog' | 'specs' | 'certification';
  name: {
    ko: string;
    en: string;
    zh: string;
  };
  description: {
    ko: string;
    en: string;
    zh: string;
  };
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  isActive: boolean;
}

export default function DownloadsPage() {
  const { t, language } = useLanguage();
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch('/ktech/api/admin/downloads?activeOnly=true');
        const data = await response.json();
        setDownloads(data);
      } catch (error) {
        console.error('Failed to fetch downloads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const catalogFiles = downloads.filter(d => d.category === 'catalog');
  const specsFiles = downloads.filter(d => d.category === 'specs');
  const certificationFiles = downloads.filter(d => d.category === 'certification');

  const downloadCategories = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('support.downloads.catalog'),
      description: t('support.downloads.catalogDesc'),
      color: 'blue',
      files: catalogFiles,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t('support.downloads.specs'),
      description: t('support.downloads.specsDesc'),
      color: 'cyan',
      files: specsFiles,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: t('support.downloads.certification'),
      description: t('support.downloads.certificationDesc'),
      color: 'indigo',
      files: certificationFiles,
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-50',
      border: 'border-blue-100',
    },
    cyan: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-600',
      hover: 'hover:bg-cyan-50',
      border: 'border-cyan-100',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      hover: 'hover:bg-indigo-50',
      border: 'border-indigo-100',
    },
  };

  const getLocalizedName = (name: { ko: string; en: string; zh: string }) => {
    return name[language] || name.ko || '';
  };

  // fileUrl에서 다운로드 API URL 생성 (한글 파일명 지원)
  const getDownloadUrl = (fileUrl: string) => {
    // /ktech/downloads/category/filename → category/filename
    const relativePath = fileUrl.replace(/^\/ktech\/downloads\//, '');
    return `/ktech/api/downloads?file=${encodeURIComponent(relativePath)}`;
  };

  return (
    <div className="pt-16 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[80px]"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-blue-300 font-medium tracking-wider text-xs">DOWNLOADS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 break-keep whitespace-pre-line"
            >
              {t('support.downloads.subtitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-blue-100/80 max-w-xl mx-auto whitespace-pre-line"
            >
              {t('support.downloads.description')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                로딩 중...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {downloadCategories.map((category, index) => {
                  const colors = colorClasses[category.color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                          <div className={colors.text}>{category.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-gray-600 text-sm mb-6">{category.description}</p>

                        {category.files.length > 0 ? (
                          <div className="space-y-3">
                            {category.files.map((file) => (
                              <a
                                key={file.id}
                                href={getDownloadUrl(file.fileUrl)}
                                download={file.fileName}
                                className={`flex items-center justify-between p-3 rounded-lg border ${colors.border} ${colors.hover} transition-colors`}
                              >
                                <div className="flex items-center gap-3">
                                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{getLocalizedName(file.name)}</p>
                                    <p className="text-xs text-gray-500">{file.fileSize}</p>
                                  </div>
                                </div>
                                <svg className={`w-5 h-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm">{t('support.downloads.comingSoon')}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {t('products.notFound')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('products.customSupport')}
              </p>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('nav.contactUs')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
