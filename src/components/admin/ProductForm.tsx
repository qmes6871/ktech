'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Product, Category, ProductImage, LocalizedString } from '@/lib/types';
import { resolveLocalized } from '@/lib/localized';

type LangKey = 'ko' | 'en' | 'zh';

const LANGUAGES: { key: LangKey; label: string }[] = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
];

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  isEdit?: boolean;
}

interface FormData {
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  descriptionHtml: LocalizedString;
  categories: Category[];
  images: ProductImage[];
  specificationsText: LocalizedString;
  specificationsHtml: LocalizedString;
  featured: boolean;
}

export function ProductForm({ product, categories, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<LangKey>('ko');

  const [formData, setFormData] = useState<FormData>({
    name: {},
    shortDescription: {},
    description: {},
    descriptionHtml: {},
    categories: [],
    images: [],
    specificationsText: {},
    specificationsHtml: {},
    featured: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || {},
        shortDescription: product.shortDescription || {},
        description: product.description || {},
        descriptionHtml: product.descriptionHtml || {},
        categories: product.categories,
        images: product.images,
        specificationsText: product.specificationsText || {},
        specificationsHtml: product.specificationsHtml || {},
        featured: product.featured || false,
      });
    }
  }, [product]);

  const setLocalizedField = (field: 'name' | 'shortDescription' | 'description' | 'descriptionHtml' | 'specificationsText' | 'specificationsHtml', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as LocalizedString),
        [activeTab]: value,
      },
    }));
  };

  const getLocalizedValue = (field: LocalizedString): string => {
    return field[activeTab] || '';
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (const file of Array.from(files)) {
        const formDataObj = new FormData();
        formDataObj.append('file', file);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataObj,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '업로드 실패');
        }

        const newImage: ProductImage = {
          id: Date.now().toString(),
          src: data.url,
          alt: resolveLocalized(formData.name, 'ko') || file.name,
          width: 800,
          height: 600,
        };

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, newImage],
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryChange = (category: Category, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c.id !== category.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit
        ? `/api/admin/products/${product?.id}`
        : '/api/admin/products';

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '저장에 실패했습니다.');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 기본 정보 (다국어 탭) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h2>

        {/* 언어 탭 */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.key}
              type="button"
              onClick={() => setActiveTab(lang.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === lang.key
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품명 *
            </label>
            <input
              type="text"
              value={getLocalizedValue(formData.name)}
              onChange={(e) => setLocalizedField('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required={activeTab === 'ko'}
              placeholder={activeTab === 'ko' ? '제품명을 입력하세요' : `제품명 (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              짧은 설명
            </label>
            <input
              type="text"
              value={getLocalizedValue(formData.shortDescription)}
              onChange={(e) => setLocalizedField('shortDescription', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={activeTab === 'ko' ? '제품 목록에 표시되는 간단한 설명' : `짧은 설명 (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 특징 (텍스트)
            </label>
            <textarea
              value={getLocalizedValue(formData.description)}
              onChange={(e) => setLocalizedField('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={activeTab === 'ko' ? '제품의 특징과 장점을 입력하세요.' : `제품 특징 (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 특징 (HTML)
              <span className="ml-2 text-xs text-blue-600 font-normal">HTML 태그 사용 가능</span>
            </label>
            <textarea
              value={getLocalizedValue(formData.descriptionHtml)}
              onChange={(e) => setLocalizedField('descriptionHtml', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
              placeholder={activeTab === 'ko' ? '<div>HTML 코드를 입력하세요...</div>' : `HTML (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML이 입력되면 텍스트 대신 HTML이 표시됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.categories.some((c) => c.id === category.id)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 이미지 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">제품 이미지</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {formData.images.map((image, index) => (
              <div key={image.id} className="relative group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={120}
                  className="w-30 h-30 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>{uploading ? '업로드 중...' : '이미지 추가'}</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              JPG, PNG, WebP 형식, 최대 100MB
            </p>
          </div>
        </div>
      </div>

      {/* 제품 상세 규격 (다국어 탭) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">제품 상세 규격</h2>

        {/* 언어 탭 */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.key}
              type="button"
              onClick={() => setActiveTab(lang.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === lang.key
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              규격 (텍스트)
            </label>
            <textarea
              value={getLocalizedValue(formData.specificationsText)}
              onChange={(e) => setLocalizedField('specificationsText', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={activeTab === 'ko' ? '제품 규격을 자유롭게 입력하세요.' : `제품 상세 규격 (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              규격 (HTML)
              <span className="ml-2 text-xs text-blue-600 font-normal">HTML 태그 사용 가능</span>
            </label>
            <textarea
              value={getLocalizedValue(formData.specificationsHtml)}
              onChange={(e) => setLocalizedField('specificationsHtml', e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
              placeholder={activeTab === 'ko' ? '<table><tr><td>규격</td><td>값</td></tr></table>' : `HTML (${LANGUAGES.find(l => l.key === activeTab)?.label})`}
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML이 입력되면 텍스트 대신 HTML이 표시됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 기타 설정 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">기타 설정</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">대표 제품으로 설정 (홈페이지에 표시)</span>
        </label>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '저장 중...' : isEdit ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
