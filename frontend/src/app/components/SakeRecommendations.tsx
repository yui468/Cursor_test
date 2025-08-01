'use client';

import { Sake } from '../page';

interface SakeRecommendationsProps {
  recommendations: Sake[];
  onSelectSake: (sake: Sake) => void;
}

export default function SakeRecommendations({
  recommendations,
  onSelectSake
}: SakeRecommendationsProps) {
  const getFlavorColor = (flavor: string) => {
    switch (flavor) {
      case 'フルーティ':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200';
      case 'すっきり':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case '上品':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case '米の旨味':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200';
      case '華やか':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200';
    }
  };

  const getSweetnessColor = (sweetness: string) => {
    switch (sweetness) {
      case '甘口':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case '中辛口':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case '辛口':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {recommendations.length}件のおすすめ日本酒が見つかりました
      </div>
      
      {recommendations.map((sake, index) => (
        <div
          key={sake.id}
          onClick={() => onSelectSake(sake)}
          className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-600"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                {sake.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                {sake.brewery}（{sake.prefecture}）
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {sake.type} | 精米歩合{sake.ricePolishingRatio} | アルコール{sake.alcoholContent}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {sake.price}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFlavorColor(sake.flavor)}`}>
              {sake.flavor}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSweetnessColor(sake.sweetness)}`}>
              {sake.sweetness}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200">
              {sake.aroma}
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
            {sake.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                酸味: {sake.acidity}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                旨味: {sake.umami}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {sake.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 rounded text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                詳細を見る →
              </span>
              <div className="text-2xl">🍶</div>
            </div>
          </div>
        </div>
      ))}

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🍶</div>
          <p className="text-slate-500 dark:text-slate-400">
            条件に合う日本酒が見つかりませんでした
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            条件を変更してお試しください
          </p>
        </div>
      )}
    </div>
  );
}