'use client';

interface Preferences {
  flavor: string;
  sweetness: string;
  acidity: string;
  price: string;
  occasion: string;
  experience: string;
}

interface SakePreferencesProps {
  preferences: Preferences;
  onPreferencesChange: (preferences: Preferences) => void;
  onGetRecommendations: () => void;
  isLoading: boolean;
}

export default function SakePreferences({
  preferences,
  onPreferencesChange,
  onGetRecommendations,
  isLoading
}: SakePreferencesProps) {
  const handleChange = (key: keyof Preferences, value: string) => {
    onPreferencesChange({
      ...preferences,
      [key]: value
    });
  };

  const isFormValid = () => {
    return preferences.flavor && preferences.sweetness && preferences.price;
  };

  return (
    <div className="space-y-6">
      {/* 味わい */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          好みの味わい
        </label>
        <select
          value={preferences.flavor}
          onChange={(e) => handleChange('flavor', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="フルーティ">フルーティ（果実のような香り）</option>
          <option value="すっきり">すっきり（清涼感）</option>
          <option value="上品">上品（洗練された味わい）</option>
          <option value="米の旨味">米の旨味（米の味わい）</option>
          <option value="華やか">華やか（豊かな香り）</option>
        </select>
      </div>

      {/* 甘さ */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          好みの甘さ
        </label>
        <select
          value={preferences.sweetness}
          onChange={(e) => handleChange('sweetness', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="甘口">甘口</option>
          <option value="中辛口">中辛口</option>
          <option value="辛口">辛口</option>
        </select>
      </div>

      {/* 酸味 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          好みの酸味
        </label>
        <select
          value={preferences.acidity}
          onChange={(e) => handleChange('acidity', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="低め">低め（まろやか）</option>
          <option value="中程度">中程度（バランス）</option>
          <option value="高め">高め（さわやか）</option>
        </select>
      </div>

      {/* 価格 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          予算
        </label>
        <select
          value={preferences.price}
          onChange={(e) => handleChange('price', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="1000円以下">1000円以下</option>
          <option value="1000-3000円">1000-3000円</option>
          <option value="3000-5000円">3000-5000円</option>
          <option value="5000円以上">5000円以上</option>
        </select>
      </div>

      {/* シーン */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          飲むシーン
        </label>
        <select
          value={preferences.occasion}
          onChange={(e) => handleChange('occasion', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="日常">日常（毎日飲む）</option>
          <option value="晩酌">晩酌（リラックスタイム）</option>
          <option value="接待">接待（ビジネス）</option>
          <option value="記念日">記念日（特別な日）</option>
          <option value="贈答">贈答（プレゼント）</option>
        </select>
      </div>

      {/* 経験レベル */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          日本酒の経験
        </label>
        <select
          value={preferences.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          <option value="初心者">初心者（初めて飲む）</option>
          <option value="中級者">中級者（時々飲む）</option>
          <option value="上級者">上級者（よく飲む）</option>
          <option value="専門家">専門家（詳しい）</option>
        </select>
      </div>

      {/* 推薦ボタン */}
      <button
        onClick={onGetRecommendations}
        disabled={!isFormValid() || isLoading}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
          isFormValid() && !isLoading
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg scale-100 hover:scale-105'
            : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            検索中...
          </div>
        ) : (
          'おすすめを取得 🍶'
        )}
      </button>

      {/* ヒント */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
          💡 ヒント
        </h4>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
          <li>• 初心者の方は「すっきり」「中辛口」から始めるのがおすすめ</li>
          <li>• 価格帯は味わいの複雑さに影響します</li>
          <li>• 温めると甘みが増し、冷やすとすっきりします</li>
        </ul>
      </div>
    </div>
  );
}