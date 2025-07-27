// カラーパレットを表示するReactコンポーネント
// 生成された色の配列を横一列で隙間なく表示するためのファイル
'use client';

import React from 'react';

const COLOR_LABELS: Record<number, string> = {
  0: '基準色',
  1: '補色',
  2: '類似色(+)',
  3: '類似色(-)',
  4: 'トライアド(+)',
  5: 'トライアド(-)',
};

export default function ColorPalette({ colors }: { colors: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
      {colors.map((color, i) => (
        <div key={color + i} className="flex flex-col items-center group">
          <div
            className="w-24 h-24 rounded-2xl shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110"
            style={{ background: color }}
            title={color}
          />
          <span className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {COLOR_LABELS[i] || `色${i + 1}`}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 select-all cursor-pointer" onClick={() => navigator.clipboard.writeText(color)}>
            {color} <span className="ml-1 text-xs text-blue-400 group-hover:underline">コピー</span>
          </span>
        </div>
      ))}
    </div>
  );
}

// tailwindcssのアニメーション用クラス
// .animate-fade-in { animation: fadeIn 0.8s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }