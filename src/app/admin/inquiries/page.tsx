'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const categoryLabels: Record<string, string> = {
  product: '제품 문의',
  quote: '견적 요청',
  technical: '기술 지원',
  partnership: '파트너십 제안',
  other: '기타 문의',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead }),
      });
      setInquiries(inquiries.map(inq =>
        inq.id === id ? { ...inq, isRead } : inq
      ));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, isRead });
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });
      setInquiries(inquiries.filter(inq => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleViewInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.isRead) {
      await handleMarkAsRead(inquiry.id, true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = inquiries.filter(inq => !inq.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
        <p className="text-gray-600 mt-1">
          총 {inquiries.length}개의 문의
          {unreadCount > 0 && (
            <span className="ml-2 text-blue-600 font-medium">
              (읽지 않음 {unreadCount}개)
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">문의 목록</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              접수된 문의가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => handleViewInquiry(inquiry)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedInquiry?.id === inquiry.id
                      ? 'bg-blue-50'
                      : inquiry.isRead
                      ? 'bg-white hover:bg-gray-50'
                      : 'bg-yellow-50 hover:bg-yellow-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!inquiry.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                        )}
                        <span className="font-medium text-gray-900 truncate">
                          {inquiry.name}
                        </span>
                        {inquiry.company && (
                          <span className="text-gray-500 text-sm truncate">
                            ({inquiry.company})
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {categoryLabels[inquiry.category] || inquiry.category || '일반'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(inquiry.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inquiry Detail */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">문의 상세</h2>
          </div>

          {selectedInquiry ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedInquiry.name}
                    {selectedInquiry.company && (
                      <span className="text-gray-500 font-normal ml-2">
                        ({selectedInquiry.company})
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(selectedInquiry.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAsRead(selectedInquiry.id, !selectedInquiry.isRead)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedInquiry.isRead
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {selectedInquiry.isRead ? '읽지 않음으로 표시' : '읽음으로 표시'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      이메일
                    </label>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      연락처
                    </label>
                    {selectedInquiry.phone ? (
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    문의 유형
                  </label>
                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {categoryLabels[selectedInquiry.category] || selectedInquiry.category || '일반'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    문의 내용
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-700">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE: 케이텍 문의 답변&body=%0A%0A---%0A원본 문의:%0A${encodeURIComponent(selectedInquiry.message)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    이메일로 답변하기
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              문의를 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
