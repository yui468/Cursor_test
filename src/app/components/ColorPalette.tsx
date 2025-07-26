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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colors.map((color, index) => {
          const validColor = getValidColor(color);
          return (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* カラー表示 */}
              <div
                className="h-32 w-full relative cursor-pointer"
                style={{ backgroundColor: validColor }}
                onClick={() => copyToClipboard(validColor, index)}
              >
                {/* ホバー時のオーバーレイ */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white bg-opacity-90 rounded-lg px-3 py-1 text-sm font-medium text-slate-800">
                      {copiedIndex === index ? 'コピーしました！' : 'クリックしてコピー'}
                    </div>
                  </div>
                </div>
              </div>

              {/* カラー情報 */}
              <div className="bg-white dark:bg-slate-700 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      カラー {index + 1}
                    </span>
                    <button
                      onClick={() => copyToClipboard(validColor, index)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">HEX:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{validColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">RGB:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">
                        {hexToRgb(validColor)?.join(', ') || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* コントラストサンプル */}
                  <div className="mt-3 space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400">コントラスト:</div>
                    <div className="flex space-x-1">
                      <div
                        className="flex-1 h-6 rounded text-xs font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: validColor, 
                          color: getContrastColor(validColor) 
                        }}
                      >
                        Aa
                      </div>
                      <div
                        className="flex-1 h-6 rounded text-xs font-medium flex items-center justify-center bg-white border border-slate-200"
                        style={{ color: validColor }}
                      >
                        Aa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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