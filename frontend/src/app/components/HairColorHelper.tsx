'use client';

import { useState } from 'react';

interface HairColorVariant {
  name: string;
  color: string;
  description: string;
}

interface HairColorSet {
  base: HairColorVariant;
  shadow1: HairColorVariant;
  shadow2: HairColorVariant;
  highlight: HairColorVariant;
  accent: HairColorVariant;
}

// 髪色の種類とその特徴
const hairColorTypes = [
  {
    name: 'ブロンド',
    baseColor: '#F4E4BC',
    description: '明るく清潔感のある印象。金髪のキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブラウン',
    baseColor: '#8B4513',
    description: '自然で親しみやすい印象。多くのキャラクターに適している。',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'レッド',
    baseColor: '#DC143C',
    description: '情熱的で目立つ印象。個性的なキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブラック',
    baseColor: '#2F2F2F',
    description: '神秘的な印象。クールで知的なキャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ピンク',
    baseColor: '#FF69B4',
    description: '可愛らしく夢想的な印象。ファンタジー系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'ブルー',
    baseColor: '#4682B4',
    description: '冷静で知的な印象。サイエンスフィクション系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'パステル',
    baseColor: '#FFE4E1',
    description: '優しく柔らかい印象。癒し系キャラクターに最適。',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face'
  },
  {
    name: 'カスタム',
    baseColor: '#3B82F6',
    description: '自由にベースカラーを選択して髪色を作成。',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop&crop=face'
  }
];

// ベースカラーから髪色セットを生成する関数
function generateHairColorSet(baseColor: string, typeName: string): HairColorSet {
  const hsl = hexToHsl(baseColor);
  if (!hsl) {
    // フォールバック用のデフォルト色
    return {
      base: { name: 'ベース', color: baseColor, description: 'メインの髪色' },
      shadow1: { name: '一影', color: '#000000', description: '最も暗い影' },
      shadow2: { name: '二影', color: '#333333', description: '中間の影' },
      highlight: { name: 'ハイライト', color: '#FFFFFF', description: '最も明るい部分' },
      accent: { name: 'アクセント', color: '#666666', description: 'アクセントカラー' }
    };
  }

  // 髪色タイプに応じて調整
  let saturationMultiplier = 1;
  let lightnessRange = 0.3;
  
  switch (typeName) {
    case 'ブロンド':
      saturationMultiplier = 0.6;
      lightnessRange = 0.4;
      break;
    case 'ブラウン':
      saturationMultiplier = 0.8;
      lightnessRange = 0.25;
      break;
    case 'レッド':
      saturationMultiplier = 1.2;
      lightnessRange = 0.3;
      break;
    case 'ブラック':
      saturationMultiplier = 0.3;
      lightnessRange = 0.15;
      break;
    case 'ピンク':
      saturationMultiplier = 1.1;
      lightnessRange = 0.35;
      break;
    case 'ブルー':
      saturationMultiplier = 0.9;
      lightnessRange = 0.3;
      break;
    case 'パステル':
      saturationMultiplier = 0.4;
      lightnessRange = 0.45;
      break;
    default:
      saturationMultiplier = 1;
      lightnessRange = 0.3;
  }

  // 各バリエーションを生成
  const baseSaturation = Math.min(100, hsl.s * saturationMultiplier);
  const baseLightness = hsl.l;

  // 一影（最も暗い）
  const shadow1Lightness = Math.max(5, baseLightness - lightnessRange * 100);
  const shadow1Color = hslToHex(hsl.h, baseSaturation * 0.8, shadow1Lightness);

  // 二影（中間の影）
  const shadow2Lightness = Math.max(10, baseLightness - lightnessRange * 50);
  const shadow2Color = hslToHex(hsl.h, baseSaturation * 0.9, shadow2Lightness);

  // ベース（メイン）
  const baseColorHex = hslToHex(hsl.h, baseSaturation, baseLightness);

  // ハイライト（最も明るい）
  const highlightLightness = Math.min(95, baseLightness + lightnessRange * 100);
  const highlightColor = hslToHex(hsl.h, baseSaturation * 0.7, highlightLightness);

  // アクセント（少し色相をずらした色）
  const accentHue = (hsl.h + 15) % 360;
  const accentColor = hslToHex(accentHue, baseSaturation * 0.6, baseLightness + 10);

  return {
    base: { 
      name: 'ベース', 
      color: baseColorHex || baseColor, 
      description: 'メインの髪色。最も面積の多い部分に使用' 
    },
    shadow1: { 
      name: '一影', 
      color: shadow1Color || '#000000', 
      description: '最も暗い影。髪の重なりや奥の部分に使用' 
    },
    shadow2: { 
      name: '二影', 
      color: shadow2Color || '#333333', 
      description: '中間の影。立体感を表現する重要な色' 
    },
    highlight: { 
      name: 'ハイライト', 
      color: highlightColor || '#FFFFFF', 
      description: '最も明るい部分。光が当たる部分に使用' 
    },
    accent: { 
      name: 'アクセント', 
      color: accentColor || '#666666', 
      description: 'アクセントカラー。髪の流れや装飾に使用' 
    }
  };
}

export default function HairColorHelper() {
  const [selectedType, setSelectedType] = useState<string>('ブロンド');
  const [customBaseColor, setCustomBaseColor] = useState<string>('#3B82F6');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    const element = document.createElement('div');
    element.textContent = 'コピーしました！';
    element.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
    document.body.appendChild(element);
    setTimeout(() => document.body.removeChild(element), 2000);
  };

  const currentType = hairColorTypes.find(type => type.name === selectedType);
  const baseColor = selectedType === 'カスタム' ? customBaseColor : (currentType?.baseColor || '#3B82F6');
  const hairColorSet = generateHairColorSet(baseColor, selectedType);

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        髪の色選びヘルパー <span className="text-xl">💇‍♀️</span>
      </h2>
      
      {/* 髪色タイプ選択 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
          髪色のタイプ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hairColorTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedType(type.name)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedType === type.name
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* カスタムカラー選択 */}
      {selectedType === 'カスタム' && (
        <div className="mb-6 bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
          <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
            ベースカラーを選択
          </h4>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={customBaseColor}
              onChange={(e) => setCustomBaseColor(e.target.value)}
              className="w-16 h-16 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer"
            />
            <div>
              <p className="font-mono text-lg text-slate-700 dark:text-slate-200">
                {customBaseColor}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                色をクリックしてベースカラーを変更
              </p>
            </div>
          </div>
        </div>
      )}

      {currentType && (
        <div className="space-y-6">
          {/* イメージ表示 */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
              {currentType.name}のイメージ
            </h4>
            <div className="flex items-center gap-4">
              <img
                src={currentType.imageUrl}
                alt={`${currentType.name}の髪色のイメージ`}
                className="w-24 h-24 rounded-lg object-cover shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex-1">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {currentType.description}
                </p>
              </div>
            </div>
          </div>

          {/* 生成された髪色セット */}
          <div>
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
              生成された髪色セット
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(hairColorSet).map(([key, variant]) => (
                <div
                  key={key}
                  className="group cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                  onClick={() => {
                    setSelectedColor(variant.color);
                    copyToClipboard(variant.color);
                  }}
                >
                  <div
                    className="w-full h-20 rounded-lg shadow-md border-2 border-transparent group-hover:border-blue-400 transition-all duration-200 mb-3"
                    style={{ backgroundColor: variant.color }}
                  />
                  <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-1">
                    {variant.name}
                  </h5>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-300 mb-2">
                    {variant.color}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {variant.description}
                  </p>
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
              <li>• <b>ベース</b>：髪の大部分に使用するメインカラー</li>
              <li>• <b>一影</b>：髪の重なりや奥の部分で最も暗い影</li>
              <li>• <b>二影</b>：立体感を表現する中間の影</li>
              <li>• <b>ハイライト</b>：光が当たる部分で最も明るい色</li>
              <li>• <b>アクセント</b>：髪の流れや装飾に使用する差し色</li>
              <li>• 色をクリックするとHEX値をコピーできます！</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
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
  const l = (max + min) / 2;

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

// HEXカラーをRGBオブジェクトに変換
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// HSL値をHEXカラーに変換
function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

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