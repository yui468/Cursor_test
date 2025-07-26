// カラーを選択・変更するためのReactコンポーネント
// ユーザーが色を選び、パレット生成の基準色を決めるためのファイル
'use client';

import { useState } from 'react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
  '#F9E79F', '#ABEBC6', '#FAD7A0', '#AED6F1', '#F5B7B1'
];

export default function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
  const [showPresets, setShowPresets] = useState(false);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    onColorChange(color);
    setShowPresets(false);
  };

  return (
    <div className="space-y-6">
      {/* メインカラー選択 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          ベースカラー
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="w-16 h-16 rounded-xl border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={currentColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      {/* プリセットカラー */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            プリセットカラー
          </label>
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showPresets ? '隠す' : '表示'}
          </button>
        </div>

        {showPresets && (
          <div className="grid grid-cols-5 gap-3">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(color)}
                className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400 transition-colors duration-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      {/* カラー情報 */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          カラー情報
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">HEX:</span>
            <span className="font-mono text-slate-900 dark:text-slate-100">{currentColor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">RGB:</span>
            <span className="font-mono text-slate-900 dark:text-slate-100">
              {hexToRgb(currentColor)?.join(', ') || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">HSL:</span>
            <span className="font-mono text-slate-900 dark:text-slate-100">
              {hexToHsl(currentColor)?.join(', ') || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): number[] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// HEXカラーをHSL（色相・彩度・輝度）に変換する関数
function hexToHsl(hex: string): string[] | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

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

  return [
    Math.round(h * 360) + '°',
    Math.round(s * 100) + '%',
    Math.round(l * 100) + '%'
  ];
}