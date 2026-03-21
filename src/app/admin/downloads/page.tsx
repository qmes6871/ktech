'use client';

import { useState, useEffect, useCallback } from 'react';

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

const categoryLabels = {
  catalog: '제품 카탈로그',
  specs: '기술 사양서',
  certification: '인증서',
};

export default function DownloadsAdminPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Download | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');

  const [formData, setFormData] = useState({
    category: 'catalog' as 'catalog' | 'specs' | 'certification',
    name: { ko: '', en: '', zh: '' },
    description: { ko: '', en: '', zh: '' },
    fileName: '',
    fileUrl: '',
    fileSize: '',
    isActive: true,
  });

  const fetchDownloads = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.append('category', categoryFilter);

      const response = await fetch(`/ktech/api/admin/downloads?${params}`);
      const data = await response.json();
      setDownloads(data);
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('category', formData.category);

      const response = await fetch('/ktech/api/admin/downloads/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          fileName: data.originalName,
          fileUrl: data.url,
          fileSize: data.fileSize,
        }));
      } else {
        alert(data.error || '파일 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fileUrl) {
      alert('파일을 먼저 업로드해주세요.');
      return;
    }

    try {
      const url = editingItem
        ? `/ktech/api/admin/downloads/${editingItem.id}`
        : '/ktech/api/admin/downloads';

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        resetForm();
        fetchDownloads();
      } else {
        const data = await response.json();
        alert(data.error || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 자료를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/ktech/api/admin/downloads/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDownloads(prev => prev.filter(d => d.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleEdit = (item: Download) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      name: item.name,
      description: item.description,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      fileSize: item.fileSize,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      category: 'catalog',
      name: { ko: '', en: '', zh: '' },
      description: { ko: '', en: '', zh: '' },
      fileName: '',
      fileUrl: '',
      fileSize: '',
      isActive: true,
    });
  };

  const openNewModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">자료실 관리</h1>
        <button
          onClick={openNewModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          자료 등록
        </button>
      </div>

      {/* 필터 */}
      <div className="bg-white rounded-lg shadow p-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">모든 카테고리</option>
          <option value="catalog">제품 카탈로그</option>
          <option value="specs">기술 사양서</option>
          <option value="certification">인증서</option>
        </select>
      </div>

      {/* 자료 목록 */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          로딩 중...
        </div>
      ) : downloads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          등록된 자료가 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자료명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  파일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  크기
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등록일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.category === 'catalog' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'specs' ? 'bg-cyan-100 text-cyan-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {categoryLabels[item.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name.ko}</div>
                    <div className="text-sm text-gray-500">{item.description.ko}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.isActive ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-sm text-gray-500">
        총 {downloads.length}개의 자료
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingItem ? '자료 수정' : '자료 등록'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 카테고리 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리 *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      category: e.target.value as 'catalog' | 'specs' | 'certification'
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="catalog">제품 카탈로그</option>
                    <option value="specs">기술 사양서</option>
                    <option value="certification">인증서</option>
                  </select>
                </div>

                {/* 파일 업로드 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    파일 업로드 *
                  </label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="mt-2 text-sm text-blue-600">업로드 중...</p>
                  )}
                  {formData.fileUrl && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ {formData.fileName} ({formData.fileSize})
                    </p>
                  )}
                </div>

                {/* 자료명 (한국어) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자료명 (한국어) *
                  </label>
                  <input
                    type="text"
                    value={formData.name.ko}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: { ...prev.name, ko: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                {/* 자료명 (영어) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자료명 (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: { ...prev.name, en: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* 자료명 (중국어) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자료명 (中文)
                  </label>
                  <input
                    type="text"
                    value={formData.name.zh}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: { ...prev.name, zh: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* 설명 (한국어) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    설명 (한국어)
                  </label>
                  <input
                    type="text"
                    value={formData.description.ko}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, ko: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* 공개 여부 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      isActive: e.target.checked
                    }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    공개
                  </label>
                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingItem ? '수정' : '등록'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
