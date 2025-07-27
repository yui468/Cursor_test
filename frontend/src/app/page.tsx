"use client";

import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import ColorWheel from './components/ColorWheel';
import ColorPalette from './components/ColorPalette';
import SavedPalettes from './components/SavedPalettes';

export default function Home() {
  // 現在選択中の色
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  // 生成されたパレット（色の配列）
  const [palette, setPalette] = useState<string[]>([]);
  // 保存されたパレットのリスト
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);
  // カラーホイールモードの切り替え
  const [useColorWheel, setUseColorWheel] = useState(false);

  // パレットを生成する関数（API呼び出し版）
  const generatePalette = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/palette/generate?baseColor=${encodeURIComponent(currentColor)}`
          : `http://localhost:8080/api/palette/generate?baseColor=${encodeURIComponent(currentColor)}`
      );
      if (!res.ok) throw new Error('API呼び出しに失敗しました');
      const data = await res.json();
      setPalette(data.palette || []);
    } catch {
      alert('パレット生成APIの呼び出しに失敗しました');
    }
  };

  // パレットを保存する関数
  const savePalette = () => {
    if (palette.length > 0) {
      setSavedPalettes(prev => [...prev, [...palette]]);
      setPalette([]);
    }
  };

  // 保存済みパレットを削除する関数
  const deletePalette = (index: number) => {
    setSavedPalettes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 dark:from-slate-900 dark:via-indigo-900 dark:to-fuchsia-900 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center justify-center gap-2">
            <span>Color Palette Creator DEMO</span>
            <span className="text-3xl animate-bounce">🎨✨</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            美しいカラーパレットを作成して、デザインに活用しましょう
          </p>
        </header>

        <div className="mb-8 text-center">
          <div className="inline-block bg-white/80 dark:bg-slate-800/80 rounded-xl px-6 py-4 shadow-md">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-1">色理論のヒント</h3>
            <ul className="text-slate-600 dark:text-slate-300 text-sm list-disc list-inside space-y-1 text-left">
              <li><b>補色</b>：基準色の反対側の色。コントラストが強く、目立つ配色。</li>
              <li><b>類似色</b>：基準色の近くの色。調和がとれた落ち着いた印象。</li>
              <li><b>トライアド</b>：色相環で120度離れた3色。バランスの良い配色。</li>
              <li>色をクリックするとHEX値をコピーできます！</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                カラー選択 <span className="text-xl">🎯</span>
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setUseColorWheel(false)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    !useColorWheel
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  シンプル
                </button>
                <button
                  onClick={() => setUseColorWheel(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    useColorWheel
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  カラーホイール
                </button>
              </div>
            </div>
            
            {useColorWheel ? (
              <ColorWheel onPaletteChange={setPalette} />
            ) : (
              <>
                <ColorPicker
                  currentColor={currentColor}
                  onColorChange={setCurrentColor}
                />
                <div className="mt-6 space-y-4">
                  <button
                    onClick={generatePalette}
                    className="w-full bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 hover:from-blue-600 hover:via-pink-500 hover:to-yellow-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg scale-100 hover:scale-105 animate-pulse"
                  >
                    パレットを生成 ✨
                  </button>
                  {palette.length > 0 && (
                    <button
                      onClick={savePalette}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                    >
                      パレットを保存
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              パレットプレビュー <span className="text-xl">🖼️</span>
            </h2>
            <ColorPalette palette={palette} />
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            保存済みパレット <span className="text-xl">💾</span>
          </h2>
          <SavedPalettes palettes={savedPalettes} onDelete={deletePalette} />
        </div>
      </div>
    </div>
  );
}