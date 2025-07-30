'use client';

import { useState } from 'react';

interface HairColor {
  name: string;
  colors: string[];
  description: string;
  imageUrl: string;
}

const hairColors: HairColor[] = [
  {
    name: 'ブロンド',
    colors: ['#F4E4BC', '#E6D3A3', '#D4C08A', '#C2AD71', '#B09A58', '#9E873F'],
    description: '明るく清潔感のある印象。金髪のキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブラウン',
    colors: ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B8860B', '#DAA520'],
    description: '自然で親しみやすい印象。多くのキャラクターに適している。',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'レッド',
    colors: ['#DC143C', '#B22222', '#CD5C5C', '#F08080', '#FA8072', '#E9967A'],
    description: '情熱的で目立つ印象。個性的なキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブラック',
    colors: ['#000000', '#1C1C1C', '#2F2F2F', '#404040', '#525252', '#696969'],
    description: '神秘的な印象。クールで知的なキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ピンク',
    colors: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#FFB6C1'],
    description: '可愛らしく夢想的な印象。ファンタジー系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブルー',
    colors: ['#87CEEB', '#4682B4', '#1E90FF', '#4169E1', '#0000CD', '#000080'],
    description: '冷静で知的な印象。サイエンスフィクション系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'パステル',
    colors: ['#FFE4E1', '#E6E6FA', '#F0F8FF', '#F5F5DC', '#FFFACD', '#F0FFF0'],
    description: '優しく柔らかい印象。癒し系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'グラデーション',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    description: 'ファンタジックで印象的な髪色。特別なキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop&crop=face'
  }
];

export default function HairColorHelper() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ブロンド');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    // コピー成功のフィードバック（簡易版）
    const element = document.createElement('div');
    element.textContent = 'コピーしました！';
    element.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
    document.body.appendChild(element);
    setTimeout(() => document.body.removeChild(element), 2000);
  };

  const currentHairColor = hairColors.find(hc => hc.name === selectedCategory);

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        髪の色選びヘルパー <span className="text-xl">💇‍♀️</span>
      </h2>
      
      {/* カテゴリ選択 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
          髪の色の種類
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hairColors.map((hairColor) => (
            <button
              key={hairColor.name}
              onClick={() => setSelectedCategory(hairColor.name)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === hairColor.name
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {hairColor.name}
            </button>
          ))}
        </div>
      </div>

      {currentHairColor && (
        <div className="space-y-6">
          {/* イメージ表示 */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
              {currentHairColor.name}のイメージ
            </h4>
            <div className="flex items-center gap-4">
              <img
                src={currentHairColor.imageUrl}
                alt={`${currentHairColor.name}の髪色のイメージ`}
                className="w-24 h-24 rounded-lg object-cover shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex-1">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {currentHairColor.description}
                </p>
              </div>
            </div>
          </div>

          {/* 色のバリエーション */}
          <div>
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
              {currentHairColor.name}の色バリエーション
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {currentHairColor.colors.map((color, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedColor(color);
                    copyToClipboard(color);
                  }}
                >
                  <div
                    className="w-full h-16 rounded-lg shadow-md border-2 border-transparent group-hover:border-blue-400 transition-all duration-200"
                    style={{ backgroundColor: color }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                      {color}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      クリックでコピー
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 選択された色の詳細 */}
          {selectedColor && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
                選択された色
              </h4>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg shadow-md border-2 border-blue-400"
                  style={{ backgroundColor: selectedColor }}
                />
                <div>
                  <p className="font-mono text-lg text-slate-700 dark:text-slate-200">
                    {selectedColor}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    この色をキャラクターの髪色として使用できます
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 使用のヒント */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
              💡 使用のヒント
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• キャラクターの性格や設定に合わせて髪色を選びましょう</li>
              <li>• 明度の異なる色を組み合わせて立体感を表現できます</li>
              <li>• ファンタジー系では派手な色も効果的です</li>
              <li>• リアル系では自然な色合いがおすすめです</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}