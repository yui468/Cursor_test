'use client';

import { useState } from 'react';

interface ColorPaletteProps {
  colors: string[];
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (color: string, index: number) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const getContrastColor = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';

    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  // 色が不正な場合のデフォルト色
  const getValidColor = (color: string): string => {
    // HEX形式の正規表現にマッチしない場合はデフォルト色を返す
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      console.warn('不正な色の値:', color);
      return '#3B82F6'; // デフォルトの青色
    }
    return color;
  };

  return (
    <div className="space-y-4">
      {/* 色を横一列で隙間なく表示 */}
      <div className="flex w-full">
        {colors.map((color, index) => {
          const validColor = getValidColor(color);
          return (
            <div
              key={index}
              className="h-24"
              style={{
                backgroundColor: validColor,
                width: `${100 / colors.length}%`, // 均等幅
              }}
            />
          );
        })}
      </div>
      {/* パレット情報 */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          パレット情報
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400">色数:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">{colors.length}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">タイプ:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">調和パレット</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">生成方法:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">色相理論</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">用途:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">デザイン</span>
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