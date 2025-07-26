// 保存されたカラーパレットを一覧表示・削除するReactコンポーネント
// ユーザーが保存したパレットを管理するためのファイル
'use client';

import { useState } from 'react';

interface SavedPalettesProps {
  palettes: string[][];
  onDelete: (index: number) => void;
}

export default function SavedPalettes({ palettes, onDelete }: SavedPalettesProps) {
  const [selectedPalette, setSelectedPalette] = useState<number | null>(null);

  const exportPalette = (palette: string[], index: number) => {
    const paletteData = {
      name: `パレット ${index + 1}`,
      colors: palette,
      exportedAt: new Date().toISOString(),
      format: 'hex'
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${index + 1}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyAllColors = async (palette: string[]) => {
    const colorText = palette.join('\n');
    try {
      await navigator.clipboard.writeText(colorText);
      alert('すべての色をコピーしました！');
    } catch (err) {
      console.error('Failed to copy colors:', err);
    }
  };

  if (palettes.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
        <div className="text-6xl mb-4">💾</div>
        <p>保存されたパレットはありません</p>
        <p className="text-sm mt-2">パレットを生成して保存してみてください</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palettes.map((palette, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* パレットヘッダー */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  パレット {index + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyAllColors(palette)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="すべての色をコピー"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => exportPalette(palette, index)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="エクスポート"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    title="削除"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {palette.length}色 • {new Date().toLocaleDateString('ja-JP')}
              </p>
            </div>

            {/* カラー表示 */}
            <div className="p-4">
              <div className="flex flex-wrap gap-1 mb-4">
                {palette.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-8 h-8 rounded-lg shadow-sm cursor-pointer hover:scale-110 transition-transform duration-200 flex-shrink-0"
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={() => {
                      navigator.clipboard.writeText(color);
                      // 簡単なフィードバック
                      const element = document.createElement('div');
                      element.textContent = 'コピーしました！';
                      element.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
                      document.body.appendChild(element);
                      setTimeout(() => document.body.removeChild(element), 2000);
                    }}
                  />
                ))}
              </div>

              {/* アクションボタン */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedPalette(selectedPalette === index ? null : index)}
                  className="flex-1 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                >
                  {selectedPalette === index ? '詳細を隠す' : '詳細表示'}
                </button>
              </div>

              {/* 詳細情報 */}
              {selectedPalette === index && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <div className="space-y-2 text-xs">
                    {palette.map((color, colorIndex) => (
                      <div key={colorIndex} className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">
                          カラー {colorIndex + 1}:
                        </span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 統計情報 */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          保存統計
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400">保存数:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">{palettes.length}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">総色数:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">
              {palettes.reduce((total, palette) => total + palette.length, 0)}
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">平均色数:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">
              {Math.round(palettes.reduce((total, palette) => total + palette.length, 0) / palettes.length)}
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">最終更新:</span>
            <span className="ml-2 font-medium text-slate-700 dark:text-slate-300">
              {new Date().toLocaleDateString('ja-JP')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}