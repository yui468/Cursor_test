'use client';

import { useState } from 'react';
import SakePreferences from './components/SakePreferences';
import SakeRecommendations from './components/SakeRecommendations';
import SakeDetails from './components/SakeDetails';

// 日本酒の型定義
export interface Sake {
  id: string;
  name: string;
  brewery: string;
  prefecture: string;
  type: string;
  ricePolishingRatio: string;
  alcoholContent: string;
  flavor: string;
  aroma: string;
  sweetness: string;
  acidity: string;
  umami: string;
  description: string;
  price: string;
  imageUrl: string;
  tags: string[];
}

// Homeコンポーネント：日本酒おすすめアプリのメイン画面
export default function Home() {
  const [preferences, setPreferences] = useState({
    flavor: '',
    sweetness: '',
    acidity: '',
    price: '',
    occasion: '',
    experience: ''
  });
  
  const [recommendations, setRecommendations] = useState<Sake[]>([]);
  const [selectedSake, setSelectedSake] = useState<Sake | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 日本酒を推薦する関数
  const getRecommendations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sake/recommend`
          : `http://localhost:8080/api/sake/recommend`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferences),
        }
      );
      
      if (!res.ok) throw new Error('API呼び出しに失敗しました');
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('推薦の取得に失敗しました:', error);
      // エラー時はモックデータを使用
      const mockRecommendations: Sake[] = generateMockRecommendations(preferences);
      setRecommendations(mockRecommendations);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-amber-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center justify-center gap-2">
            <span>日本酒おすすめアプリ</span>
            <span className="text-3xl animate-bounce">🍶✨</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            あなたの好みに合わせて、ぴったりの日本酒をおすすめします
          </p>
        </header>

        <div className="mb-8 text-center">
          <div className="inline-block bg-white/80 dark:bg-slate-800/80 rounded-xl px-6 py-4 shadow-md">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-1">日本酒の基本知識</h3>
            <ul className="text-slate-600 dark:text-slate-300 text-sm list-disc list-inside space-y-1 text-left">
              <li><b>大吟醸</b>：精米歩合50%以下。フルーティで華やかな香り。</li>
              <li><b>吟醸酒</b>：精米歩合60%以下。上品で洗練された味わい。</li>
              <li><b>純米酒</b>：米と麹のみで醸造。米の旨味が特徴。</li>
              <li><b>本醸造酒</b>：醸造アルコールを添加。すっきりとした味わい。</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              好みを教えてください <span className="text-xl">🎯</span>
            </h2>
            <SakePreferences
              preferences={preferences}
              onPreferencesChange={setPreferences}
              onGetRecommendations={getRecommendations}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              おすすめ日本酒 <span className="text-xl">🍶</span>
            </h2>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">おすすめを検索中...</p>
              </div>
            ) : recommendations.length > 0 ? (
              <SakeRecommendations
                recommendations={recommendations}
                onSelectSake={setSelectedSake}
              />
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-6xl mb-4 animate-bounce">🍶</div>
                <p>好みを選択しておすすめを取得してください</p>
              </div>
            )}
          </div>
        </div>

        {selectedSake && (
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              日本酒の詳細 <span className="text-xl">📋</span>
            </h2>
            <SakeDetails sake={selectedSake} onClose={() => setSelectedSake(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

// モックデータ生成関数
function generateMockRecommendations(preferences: any): Sake[] {
  const mockSakes: Sake[] = [
    {
      id: '1',
      name: '獺祭 純米大吟醸 磨き二割三分',
      brewery: '旭酒造',
      prefecture: '山口県',
      type: '純米大吟醸',
      ricePolishingRatio: '23%',
      alcoholContent: '16%',
      flavor: 'フルーティ',
      aroma: '華やか',
      sweetness: '中辛口',
      acidity: '中程度',
      umami: '豊富',
      description: '精米歩合23%という極限まで磨いた米で醸造された高級純米大吟醸。フルーティで華やかな香りと、上品で洗練された味わいが特徴です。',
      price: '¥8,000',
      imageUrl: '/api/placeholder/300/200',
      tags: ['高級', 'フルーティ', '華やか']
    },
    {
      id: '2',
      name: '久保田 千寿',
      brewery: '朝日酒造',
      prefecture: '新潟県',
      type: '本醸造酒',
      ricePolishingRatio: '65%',
      alcoholContent: '15%',
      flavor: 'すっきり',
      aroma: '清涼',
      sweetness: '辛口',
      acidity: '低め',
      umami: '控えめ',
      description: '新潟の水と米の特徴を活かした、すっきりとした辛口の本醸造酒。清涼感のある香りと、後味のすっきりとした飲み口が特徴です。',
      price: '¥1,200',
      imageUrl: '/api/placeholder/300/200',
      tags: ['辛口', 'すっきり', '清涼']
    },
    {
      id: '3',
      name: '八海山 純米吟醸',
      brewery: '八海醸造',
      prefecture: '新潟県',
      type: '純米吟醸',
      ricePolishingRatio: '55%',
      alcoholContent: '15%',
      flavor: '上品',
      aroma: '吟醸香',
      sweetness: '中辛口',
      acidity: '中程度',
      umami: 'バランス',
      description: '新潟県の名水と良質な米を使用した純米吟醸。上品な吟醸香と、バランスの取れた味わいが特徴です。',
      price: '¥2,500',
      imageUrl: '/api/placeholder/300/200',
      tags: ['上品', '吟醸香', 'バランス']
    },
    {
      id: '4',
      name: '白鶴 特別純米',
      brewery: '白鶴酒造',
      prefecture: '兵庫県',
      type: '特別純米酒',
      ricePolishingRatio: '60%',
      alcoholContent: '15%',
      flavor: '米の旨味',
      aroma: '米香',
      sweetness: '中辛口',
      acidity: '中程度',
      umami: '豊富',
      description: '米と麹のみで醸造された特別純米酒。米の旨味が豊富で、温めても冷やしても美味しく飲めます。',
      price: '¥1,800',
      imageUrl: '/api/placeholder/300/200',
      tags: ['米の旨味', '温冷両用', '豊富']
    }
  ];

  // 好みに基づいてフィルタリング（簡易版）
  return mockSakes.filter(sake => {
    if (preferences.sweetness && sake.sweetness !== preferences.sweetness) return false;
    if (preferences.flavor && sake.flavor !== preferences.flavor) return false;
    return true;
  }).slice(0, 3); // 最大3つまで
}
