// カラーパレット作成アプリのメインページ
// 色の選択・パレット生成・保存・表示など全体の画面構成を管理するファイル
'use client';

import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import ColorPalette from './components/ColorPalette';
import SavedPalettes from './components/SavedPalettes';
import HairColorHelper from './components/HairColorHelper';
import HairColorExtractor from './components/HairColorExtractor';

// Homeコンポーネント：カラーパレット作成ツールのメイン画面
export default function Home() {
  // 現在選択中の色
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  // 生成されたパレット（色の配列）
  const [palette, setPalette] = useState<string[]>([]);
  // 保存されたパレットのリスト
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);
  // 現在のタブ
  const [activeTab, setActiveTab] = useState<'palette' | 'hair' | 'extractor'>('palette');

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

        {/* タブ切り替え */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-1 shadow-md">
              <button
                onClick={() => setActiveTab('palette')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'palette'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                🎨 カラーパレット作成
              </button>
              <button
                onClick={() => setActiveTab('hair')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'hair'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                💇‍♀️ 髪の色選びヘルパー
              </button>
              <button
                onClick={() => setActiveTab('extractor')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'extractor'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                🔍 髪色抽出ツール
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'palette' && (
          <>
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
          </>
        )}

        {activeTab === 'palette' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  カラー選択 <span className="text-xl">🎯</span>
                </h2>
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
              </div>

              <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  生成されたパレット <span className="text-xl">🌈</span>
                </h2>
                {palette.length > 0 ? (
                  <ColorPalette colors={palette} />
                ) : (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <div className="text-6xl mb-4 animate-bounce">🎨</div>
                    <p>カラーを選択してパレットを生成してください</p>
                  </div>
                )}
              </div>
            </div>

            {savedPalettes.length > 0 && (
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  保存されたパレット <span className="text-xl">💾</span>
                </h2>
                <SavedPalettes
                  palettes={savedPalettes}
                  onDelete={deletePalette}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'hair' && (
          <div className="mb-12">
            <HairColorHelper />
          </div>
        )}

        {activeTab === 'extractor' && (
          <div className="mb-12">
            <HairColorExtractor />
          </div>
        )}
      </div>
    </div>
  );
}





// HEXカラーをRGBオブジェクトに変換
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// RGB値をHEXカラーに変換
function rgbToHex(r: number, g: number, b: number): string {
  // 値の範囲を0-255に制限
  const clampR = Math.max(0, Math.min(255, Math.round(r)));
  const clampG = Math.max(0, Math.min(255, Math.round(g)));
  const clampB = Math.max(0, Math.min(255, Math.round(b)));

  const hex = ((1 << 24) + (clampR << 16) + (clampG << 8) + clampB).toString(16).slice(1);
  return `#${hex}`;
}

// HEXカラーをHSLオブジェクトに変換
function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2; // ← let→constに修正済み

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// HSL値をHEXカラーに変換
function hslToHex(h: number, s: number, l: number): string {
  // 値の範囲を制限
  h = ((h % 360) + 360) % 360; // 0-360の範囲に
  s = Math.max(0, Math.min(100, s)); // 0-100の範囲に
  l = Math.max(0, Math.min(100, l)); // 0-100の範囲に

  h /= 360;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 1 / 6) {
    r = c; g = x; b = 0;
  } else if (1 / 6 <= h && h < 1 / 3) {
    r = x; g = c; b = 0;
  } else if (1 / 3 <= h && h < 1 / 2) {
    r = 0; g = c; b = x;
  } else if (1 / 2 <= h && h < 2 / 3) {
    r = 0; g = x; b = c;
  } else if (2 / 3 <= h && h < 5 / 6) {
    r = x; g = 0; b = c;
  } else if (5 / 6 <= h && h <= 1) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
