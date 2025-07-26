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

  if (colors.length === 0) {
    return <div>色配列が空です</div>;
  }

  return (
    <div className="space-y-4">
      {/* 色を横並びで表示 */}
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => {
          const validColor = getValidColor(color);
          return (
            <div
              key={index}
              style={{ 
                minWidth: '120px', 
                maxWidth: '200px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s',
                flexShrink: 0,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* カラー表示 */}
              <div
                style={{ 
                  backgroundColor: validColor,
                  height: '96px',
                  width: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: `2px solid ${validColor}` // カラーに合わせた境界線
                }}
                onClick={() => copyToClipboard(validColor, index)}
                title={`Color: ${validColor}`}
                              >
                <div style={{  
                  fontSize: '12px', 
                  color: 'white', 
                  textShadow: '1px 1px 2px black', 
                  fontWeight: 'bold',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {validColor}
                </div>
              </div>

              {/* カラー情報 */}
              <div className="bg-white dark:bg-slate-700 p-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      カラー {index + 1}
                    </span>
                    <button
                      onClick={() => copyToClipboard(validColor, index)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">HEX:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">{validColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">RGB:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                        {hexToRgb(validColor)?.join(', ') || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* コントラストサンプル */}
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400">コントラスト:</div>
                    <div className="flex space-x-1">
                      <div
                        className="flex-1 h-4 rounded text-xs font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: validColor, 
                          color: getContrastColor(validColor) 
                        }}
                      >
                        Aa
                      </div>
                      <div
                        className="flex-1 h-4 rounded text-xs font-medium flex items-center justify-center bg-white border border-slate-200"
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