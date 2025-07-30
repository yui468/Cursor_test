'use client';

import { useState } from 'react';

interface HairColorVariant {
  name: string;
  color: string;
}

interface HairColorSet {
  base: HairColorVariant;
  shadow1: HairColorVariant;
  shadow2: HairColorVariant;
  highlight: HairColorVariant;
  accent: HairColorVariant;
}

// ベースカラーから髪色セットを生成する関数
function generateHairColorSet(baseColor: string): HairColorSet {
  const hsl = hexToHsl(baseColor);
  if (!hsl) {
    // フォールバック用のデフォルト色
    return {
      base: { name: 'ベース', color: baseColor },
      shadow1: { name: '一影', color: '#000000' },
      shadow2: { name: '二影', color: '#333333' },
      highlight: { name: 'ハイライト', color: '#FFFFFF' },
      accent: { name: 'アクセント', color: '#666666' }
    };
  }

  // 各バリエーションを生成
  const baseSaturation = hsl.s;
  const baseLightness = hsl.l;
  const lightnessRange = 0.3;

  // 一影（最も明るい影）
  const shadow1Lightness = Math.max(10, baseLightness - lightnessRange * 30);
  const shadow1Color = hslToHex(hsl.h, baseSaturation * 0.9, shadow1Lightness);

  // 二影（最も暗い影）
  const shadow2Lightness = Math.max(5, baseLightness - lightnessRange * 100);
  const shadow2Color = hslToHex(hsl.h, baseSaturation * 0.8, shadow2Lightness);

  // ベース（メイン）
  const baseColorHex = hslToHex(hsl.h, baseSaturation, baseLightness);

  // ハイライト（最も明るい）
  const highlightLightness = Math.min(95, baseLightness + lightnessRange * 100);
  const highlightColor = hslToHex(hsl.h, baseSaturation * 0.7, highlightLightness);

  // アクセント（少し色相をずらした色）
  const accentHue = (hsl.h + 15) % 360;
  const accentColor = hslToHex(accentHue, baseSaturation * 0.6, baseLightness + 10);

  return {
    base: { name: 'ベース', color: baseColorHex || baseColor },
    shadow1: { name: '一影', color: shadow1Color || '#000000' },
    shadow2: { name: '二影', color: shadow2Color || '#333333' },
    highlight: { name: 'ハイライト', color: highlightColor || '#FFFFFF' },
    accent: { name: 'アクセント', color: accentColor || '#666666' }
  };
}

export default function HairColorHelper() {
  const [baseColor, setBaseColor] = useState<string>('#F4E4BC');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    const element = document.createElement('div');
    element.textContent = 'コピーしました！';
    element.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
    document.body.appendChild(element);
    setTimeout(() => document.body.removeChild(element), 2000);
  };

  const hairColorSet = generateHairColorSet(baseColor);

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        髪の色選びヘルパー <span className="text-xl">💇‍♀️</span>
      </h2>
      
      {/* ベースカラー選択 */}
      <div className="mb-8 bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
          ベースカラーを選択
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-20 h-20 rounded-lg border-2 border-slate-300 dark:border-slate-600 cursor-pointer shadow-md"
          />
          <div>
            <p className="font-mono text-xl text-slate-700 dark:text-slate-200 font-bold">
              {baseColor}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              色をクリックしてベースカラーを変更してください
            </p>
          </div>
        </div>
      </div>

      {/* 生成された髪色セット */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
          生成された髪色セット
        </h3>
        <div className="flex gap-0">
          {Object.entries(hairColorSet).map(([key, variant]) => (
            <div
              key={key}
              className="flex-1 group cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => {
                setSelectedColor(variant.color);
                copyToClipboard(variant.color);
              }}
            >
              <div
                className="w-full h-32 border border-slate-200 dark:border-slate-600"
                style={{ backgroundColor: variant.color }}
              />
              <div className="bg-slate-50 dark:bg-slate-700 p-3 border border-slate-200 dark:border-slate-600">
                <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-1 text-center text-sm">
                  {variant.name}
                </h5>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 text-center">
                  {variant.color}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 選択された色の詳細 */}
      {selectedColor && (
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
            選択された色
          </h4>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-lg shadow-md border-2 border-blue-400"
              style={{ backgroundColor: selectedColor }}
            />
            <div>
              <p className="font-mono text-xl text-slate-700 dark:text-slate-200 font-bold">
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
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
        <h4 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          💡 使用のヒント
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-2">色の役割</h5>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• <b>ベース</b>：髪の大部分に使用するメインカラー</li>
              <li>• <b>一影</b>：最も明るい影</li>
              <li>• <b>二影</b>：最も暗い影</li>
              <li>• <b>ハイライト</b>：光が当たる部分で最も明るい色</li>
              <li>• <b>アクセント</b>：髪の流れや装飾に使用する差し色</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-2">使用方法</h5>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• 色をクリックするとHEX値をコピーできます</li>
              <li>• ベースカラーを変更すると全ての色が自動調整されます</li>
              <li>• イラストソフトでレイヤー分けして使用することをおすすめ</li>
            </ul>
          </div>
        </div>
      </div>
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