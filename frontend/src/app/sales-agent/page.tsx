'use client';

import React, { useState } from 'react';
import SalesAgentForm from '../components/SalesAgentForm';
import SalesListDisplay from '../components/SalesListDisplay';
import { SalesListRequest, SalesListResponse } from '../types/sales';

export default function SalesAgentPage() {
  const [salesList, setSalesList] = useState<SalesListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSalesList = async (request: SalesListRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // RenderのバックエンドURLを使用
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://cursor-test-backend.onrender.com';
      console.log('Calling backend:', `${backendUrl}/api/sales-agent/generate-sales-list`);
      
      const response = await fetch(`${backendUrl}/api/sales-agent/generate-sales-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(`営業リストの生成に失敗しました (${response.status}): ${errorText}`);
      }

      const data: SalesListResponse = await response.json();
      console.log('Received data:', data);
      
      if (!data.prospects || data.prospects.length === 0) {
        throw new Error('営業リストが空です。条件を変更して再試行してください。');
      }
      
      setSalesList(data);
    } catch (err) {
      console.error('Error in handleGenerateSalesList:', err);
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
                <h3 className="text-lg font-semibold text-red-800 mb-2">エラーが発生しました</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  エラーをクリア
                </button>
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