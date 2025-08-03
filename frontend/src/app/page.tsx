'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI営業リスト作成エージェント
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gemini AIがニュース記事を分析して、最適な営業対象企業を自動で選定します。
            業界・キーワード・企業規模に基づいて、高精度な営業リストを生成できます。
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI分析</h3>
              <p className="text-gray-600">Gemini AIによる高度な自然言語処理でニュース記事を分析</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">自動選定</h3>
              <p className="text-gray-600">営業条件に基づいて最適な企業を自動で選定</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">高精度</h3>
              <p className="text-gray-600">関連性スコアと選定理由で営業効率を最大化</p>
            </div>
          </div>

          <Link
            href="/sales-agent"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            <span className="mr-2">🚀</span>
            営業リスト作成を開始
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">主な機能</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                ニュース記事の自動収集・分析
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                業界・キーワードによる企業選定
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                関連性スコアによる優先度付け
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                AIによる選定理由の提供
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                企業規模フィルタリング
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                詳細な企業情報表示
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">技術仕様</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                Gemini AI API統合
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                Next.js 15.4.2 + TypeScript
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                Spring Boot 3.2.0 + Java 17
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                Tailwind CSS + レスポンシブデザイン
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                RESTful API + Swagger
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🔧</span>
                Vercel + 自動デプロイ
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
