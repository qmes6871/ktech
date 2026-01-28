'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { ProductGallery } from './ProductGallery';
import { ProductSpecs } from './ProductSpecs';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveLocalized } from '@/lib/localized';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const name = resolveLocalized(product.name, language);
  const description = resolveLocalized(product.description, language);
  const descriptionHtml = resolveLocalized(product.descriptionHtml, language);
  const specificationsText = resolveLocalized(product.specificationsText, language);
  const specificationsHtml = resolveLocalized(product.specificationsHtml, language);
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-gray-50">
      {/* Hero Section with Breadcrumb */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
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
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm mb-6"
          >
            <Link href="/" className="text-blue-200 hover:text-white transition-colors">
              홈
            </Link>
            <span className="text-blue-300">/</span>
            <Link href="/products" className="text-blue-200 hover:text-white transition-colors">
              제품소개
            </Link>
            {product.categories[0] && (
              <>
                <span className="text-blue-300">/</span>
                <Link
                  href={`/products?category=${product.categories[0].slug}`}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  {product.categories[0].name}
                </Link>
              </>
            )}
            <span className="text-blue-300">/</span>
            <span className="text-white">{name}</span>
          </motion.nav>

          {/* Category Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {product.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-200 text-xs hover:bg-white/20 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white break-keep"
          >
            {name}
          </motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Product Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden -mt-8 relative z-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
              <ProductGallery images={product.images} productName={name} />
            </div>

            {/* Product Details */}
            <div className="p-6 lg:p-8 flex flex-col">
              {/* Product Name */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-4"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 break-keep">
                  {name}
                </h2>
              </motion.div>

              {/* Features (was Description) */}
              {(description || descriptionHtml) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                    제품 특징
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml || description || '' }}
                  />
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-auto pt-6 border-t border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/support"
                      className="w-full block bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-6 rounded-xl font-medium text-center hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                    >
                      견적 문의하기
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/support"
                      className="w-full block border-2 border-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-medium text-center hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      전화 상담
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Specifications Section */}
        {(product.specifications.length > 0 || specificationsText) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden mt-8"
          >
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                제품 상세 규격
              </h2>
              <ProductSpecs
                specs={product.specifications}
                specificationsText={specificationsText}
                specificationsHtml={specificationsHtml}
              />
            </div>
          </motion.div>
        )}

        {/* Related Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              모든 제품 보기
            </Link>
          </motion.div>
          {product.categories[0] && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/products?category=${product.categories[0].slug}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {product.categories[0].name} 더보기
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
