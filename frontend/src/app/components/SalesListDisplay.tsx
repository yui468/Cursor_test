'use client';

import React, { useState } from 'react';
import { SalesListResponse, Prospect } from '../types/sales';

interface SalesListDisplayProps {
  salesList: SalesListResponse;
}

export default function SalesListDisplay({ salesList }: SalesListDisplayProps) {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());

  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP');
  };

  const toggleCompanyExpansion = (companyName: string) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(companyName)) {
      newExpanded.delete(companyName);
    } else {
      newExpanded.add(companyName);
    }
    setExpandedCompanies(newExpanded);
  };

  const CompanyInfoAccordion = ({ prospect }: { prospect: Prospect }) => {
    const isExpanded = expandedCompanies.has(prospect.companyName);
    const hasCompanyInfo = prospect.companyInfo;

    return (
      <div className="border-t border-gray-200 pt-4 mt-4">
        <button
          onClick={() => toggleCompanyExpansion(prospect.companyName)}
          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <span className="flex items-center">
            <svg
              className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            企業詳細情報
          </span>
          <span className="text-xs text-gray-500">
            {hasCompanyInfo ? '詳細あり' : '基本情報のみ'}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {hasCompanyInfo ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {/* 基本情報 */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">基本情報</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">設立年:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.foundedYear}年</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">従業員数:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.employeeCount}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">売上:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.revenue}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">本社:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.headquarters}</p>
                    </div>
                  </div>
                </div>

                {/* 事業概要 */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">事業概要</h4>
                  <p className="text-sm text-gray-700 mb-3">{prospect.companyInfo?.description}</p>
                  
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">主要製品・サービス:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.mainProducts}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">ビジネスモデル:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.businessModel}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">ターゲット市場:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.targetMarket}</p>
                    </div>
                  </div>
                </div>

                {/* 競合優位性 */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">競合優位性・成長性</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">競合優位性:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.competitiveAdvantage}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">成長性:</span>
                      <p className="text-gray-800">{prospect.companyInfo?.growthPotential}</p>
                    </div>
                  </div>
                </div>

                {/* 最新ニュース */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">最新ニュース</h4>
                  <p className="text-sm text-gray-700">{prospect.companyInfo?.recentNews}</p>
                </div>

                {/* 外部リンク */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">外部リンク</h4>
                  <a
                    href={prospect.companyInfo?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    {prospect.companyInfo?.website}
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  この企業の詳細情報は現在データベースに登録されていません。
                  基本情報のみ表示しています。
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* サマリー */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">生成サマリー</h3>
        <p className="text-blue-700">{salesList.summary}</p>
        <div className="mt-2 text-sm text-blue-600">
          生成日時: {formatDate(salesList.generatedAt)}
        </div>
      </div>

      {/* 営業リスト */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          営業対象企業 ({salesList.totalCount}件)
        </h3>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {salesList.prospects.map((prospect, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {prospect.companyName}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(prospect.relevanceScore)}`}>
                  関連性: {(prospect.relevanceScore * 100).toFixed(0)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                <div>
                  <span className="font-medium">業界:</span> {prospect.industry}
                </div>
                <div>
                  <span className="font-medium">担当者:</span> {prospect.contactPerson}
                </div>
                <div>
                  <span className="font-medium">メール:</span> {prospect.email}
                </div>
                <div>
                  <span className="font-medium">電話:</span> {prospect.phone}
                </div>
              </div>
              
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-medium">選定理由:</span> {prospect.reasoning}
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                ニュースソース: {prospect.newsSource}
              </div>

              {/* アコーディオン形式の企業情報 */}
              <CompanyInfoAccordion prospect={prospect} />
            </div>
          ))}
        </div>
      </div>

      {/* 詳細モーダル */}
      {selectedProspect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedProspect.companyName}
                </h3>
                <button
                  onClick={() => setSelectedProspect(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">業界:</span>
                    <p className="text-gray-900">{selectedProspect.industry}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">関連性スコア:</span>
                    <p className={`font-semibold ${getRelevanceColor(selectedProspect.relevanceScore)}`}>
                      {(selectedProspect.relevanceScore * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">担当者情報:</span>
                  <div className="mt-1 space-y-1">
                    <p className="text-gray-900">名前: {selectedProspect.contactPerson}</p>
                    <p className="text-gray-900">メール: {selectedProspect.email}</p>
                    <p className="text-gray-900">電話: {selectedProspect.phone}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">選定理由:</span>
                  <p className="text-gray-900 mt-1">{selectedProspect.reasoning}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">ニュースソース:</span>
                  <p className="text-gray-900 mt-1">{selectedProspect.newsSource}</p>
                </div>

                {/* 企業詳細情報 */}
                {selectedProspect.companyInfo && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">企業詳細情報</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="font-medium text-gray-600">設立年:</span>
                        <p className="text-gray-800">{selectedProspect.companyInfo.foundedYear}年</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">従業員数:</span>
                        <p className="text-gray-800">{selectedProspect.companyInfo.employeeCount}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">売上:</span>
                        <p className="text-gray-800">{selectedProspect.companyInfo.revenue}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">本社:</span>
                        <p className="text-gray-800">{selectedProspect.companyInfo.headquarters}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">事業概要:</span>
                        <p className="text-gray-800">{selectedProspect.companyInfo.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedProspect(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  閉じる
                </button>
                <button
                  onClick={() => {
                    // ここで営業活動の記録やフォローアップ機能を実装
                    alert('営業活動の記録機能は今後実装予定です');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  営業活動記録
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}