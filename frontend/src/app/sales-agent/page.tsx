'use client';

import React, { useState } from 'react';
import SalesAgentForm from '../components/SalesAgentForm';
import SalesListDisplay from '../components/SalesListDisplay';
import { SalesListRequest, SalesListResponse, Prospect } from '../types/sales';

export default function SalesAgentPage() {
  const [salesList, setSalesList] = useState<SalesListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSalesList = async (request: SalesListRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/sales-agent/generate-sales-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('営業リストの生成に失敗しました');
      }

      const data: SalesListResponse = await response.json();
      setSalesList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI営業リスト作成エージェント
          </h1>
          <p className="text-xl text-gray-600">
            Gemini AIがニュース記事を分析して、最適な営業対象企業を自動で選定します
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              営業条件設定
            </h2>
            <SalesAgentForm 
              onSubmit={handleGenerateSalesList}
              loading={loading}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              生成結果
            </h2>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">営業リストを生成中...</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            {salesList && !loading && (
              <SalesListDisplay salesList={salesList} />
            )}
            
            {!salesList && !loading && !error && (
              <div className="text-center py-12 text-gray-500">
                <p>営業条件を設定して「営業リスト生成」ボタンを押してください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}