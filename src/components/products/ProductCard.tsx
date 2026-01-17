'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const mainImage = product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.slug}`}>
        <motion.article
          whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)' }}
          transition={{ duration: 0.3 }}
          className="group bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                이미지 없음
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-1 mb-2">
              {product.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              자세히 보기
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
