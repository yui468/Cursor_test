'use client';

import { Sake } from '../page';

interface SakeDetailsProps {
  sake: Sake;
  onClose: () => void;
}

export default function SakeDetails({ sake, onClose }: SakeDetailsProps) {
  const getFlavorDescription = (flavor: string) => {
    switch (flavor) {
      case 'フルーティ':
        return '果実のような華やかな香りが特徴で、特にリンゴやメロンのような香りを感じることができます。';
      case 'すっきり':
        return '清涼感のある香りで、後味がすっきりとしていて飲みやすい特徴があります。';
      case '上品':
        return '洗練された上品な香りで、複雑で深みのある味わいが特徴です。';
      case '米の旨味':
        return '米の旨味が豊富で、温めるとより一層米の甘みが引き立ちます。';
      case '華やか':
        return '豊かな香りが特徴で、特に吟醸香と呼ばれる華やかな香りを楽しめます。';
      default:
        return 'バランスの取れた味わいで、様々な料理との相性が良い特徴があります。';
    }
  };

  const getServingAdvice = (sake: Sake) => {
    const advice = [];
    
    if (sake.flavor === 'フルーティ' || sake.flavor === '華やか') {
      advice.push('冷蔵庫で冷やして（5-10℃）飲むと香りが際立ちます');
    }
    if (sake.flavor === '米の旨味') {
      advice.push('常温または温めて（40-50℃）飲むと米の旨味が引き立ちます');
    }
    if (sake.sweetness === '辛口') {
      advice.push('冷やして飲むとすっきりとした味わいを楽しめます');
    }
    if (sake.sweetness === '甘口') {
      advice.push('常温で飲むと甘みがより感じられます');
    }
    
    return advice.length > 0 ? advice : ['常温（15-20℃）で飲むのがおすすめです'];
  };

  const getFoodPairing = (sake: Sake) => {
    const pairings = [];
    
    if (sake.flavor === 'フルーティ') {
      pairings.push('刺身、白身魚、チーズ');
    }
    if (sake.flavor === 'すっきり') {
      pairings.push('天ぷら、焼き魚、サラダ');
    }
    if (sake.flavor === '米の旨味') {
      pairings.push('煮物、焼き鳥、鍋料理');
    }
    if (sake.sweetness === '辛口') {
      pairings.push('脂の多い料理、濃い味の料理');
    }
    if (sake.sweetness === '甘口') {
      pairings.push('辛い料理、酸味のある料理');
    }
    
    return pairings.length > 0 ? pairings : ['和食全般、特に刺身や焼き魚'];
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          詳細情報
        </h3>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          ✕
        </button>
      </div>

      {/* 基本情報 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {sake.name}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">酒造:</span> {sake.brewery}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">産地:</span> {sake.prefecture}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">種類:</span> {sake.type}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">精米歩合:</span> {sake.ricePolishingRatio}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">アルコール度数:</span> {sake.alcoholContent}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">価格:</span> {sake.price}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">香り:</span> {sake.aroma}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              <span className="font-medium">旨味:</span> {sake.umami}
            </p>
          </div>
        </div>
      </div>

      {/* 味わいの特徴 */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          🍶 味わいの特徴
        </h4>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          {sake.description}
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          {getFlavorDescription(sake.flavor)}
        </p>
      </div>

      {/* 飲み方のアドバイス */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          🌡️ 飲み方のアドバイス
        </h4>
        <ul className="space-y-2">
          {getServingAdvice(sake).map((advice, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span className="text-slate-700 dark:text-slate-300">{advice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 料理との相性 */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          🍽️ 料理との相性
        </h4>
        <div className="space-y-2">
          {getFoodPairing(sake).map((pairing, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-amber-500">•</span>
              <span className="text-slate-700 dark:text-slate-300">{pairing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* タグ */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          🏷️ 特徴タグ
        </h4>
        <div className="flex flex-wrap gap-2">
          {sake.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 購入ボタン */}
      <div className="flex gap-4">
        <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
          購入する
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}