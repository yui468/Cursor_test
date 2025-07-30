'use client';

import { useState, useRef, useCallback } from 'react';

interface ExtractedColor {
  name: string;
  color: string;
  percentage: number;
}

interface HairColorSet {
  base: ExtractedColor;
  shadow1: ExtractedColor;
  shadow2: ExtractedColor;
  highlight: ExtractedColor;
  accent: ExtractedColor;
}

// 色をHSLに変換
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

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

// 色をHEXに変換
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 色差を計算（簡易版）
function colorDistance(color1: { r: number, g: number, b: number }, color2: { r: number, g: number, b: number }) {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2)
  );
}

// K-meansクラスタリング（簡易版）
function kMeansClustering(colors: { r: number, g: number, b: number }[], k: number) {
  if (colors.length === 0) return [];

  // 初期クラスタ中心をランダムに選択
  const centers = [];
  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    centers.push({ ...colors[randomIndex] });
  }

  let iterations = 0;
  const maxIterations = 100;

  while (iterations < maxIterations) {
    // 各色を最も近いクラスタに割り当て
    const clusters: { r: number, g: number, b: number }[][] = Array.from({ length: k }, () => []);
    
    colors.forEach(color => {
      let minDistance = Infinity;
      let closestCluster = 0;
      
      centers.forEach((center, index) => {
        const distance = colorDistance(color, center);
        if (distance < minDistance) {
          minDistance = distance;
          closestCluster = index;
        }
      });
      
      clusters[closestCluster].push(color);
    });

    // 新しいクラスタ中心を計算
    const newCenters = clusters.map(cluster => {
      if (cluster.length === 0) {
        return { r: 0, g: 0, b: 0 };
      }
      
      const sum = cluster.reduce((acc, color) => ({
        r: acc.r + color.r,
        g: acc.g + color.g,
        b: acc.b + color.b
      }), { r: 0, g: 0, b: 0 });
      
      return {
        r: sum.r / cluster.length,
        g: sum.g / cluster.length,
        b: sum.b / cluster.length
      };
    });

    // 収束チェック
    const converged = centers.every((center, index) => 
      colorDistance(center, newCenters[index]) < 1
    );
    
    if (converged) break;
    
    centers.splice(0, centers.length, ...newCenters);
    iterations++;
  }

  return centers;
}

// 髪色を役割に分類
function classifyHairColors(colors: { r: number, g: number, b: number }[]): HairColorSet {
  if (colors.length === 0) {
    return {
      base: { name: 'ベース', color: '#000000', percentage: 0 },
      shadow1: { name: '一影', color: '#000000', percentage: 0 },
      shadow2: { name: '二影', color: '#000000', percentage: 0 },
      highlight: { name: 'ハイライト', color: '#000000', percentage: 0 },
      accent: { name: 'アクセント', color: '#000000', percentage: 0 }
    };
  }

  // 各色をHSLに変換
  const hslColors = colors.map(color => ({
    ...color,
    hsl: rgbToHsl(color.r, color.g, color.b)
  }));

  // 明度でソート
  hslColors.sort((a, b) => b.hsl.l - a.hsl.l);

  // 色を役割に分類
  const totalColors = hslColors.length;
  const baseIndex = Math.floor(totalColors * 0.4); // 中間40%
  const shadow1Index = Math.floor(totalColors * 0.7); // 明るい影30%
  const shadow2Index = Math.floor(totalColors * 0.9); // 暗い影20%
  const highlightIndex = Math.floor(totalColors * 0.1); // ハイライト10%
  const accentIndex = Math.floor(totalColors * 0.5); // アクセント（色相をずらす）

  const base = hslColors[baseIndex] || hslColors[0];
  const shadow1 = hslColors[shadow1Index] || hslColors[Math.floor(totalColors * 0.7)];
  const shadow2 = hslColors[shadow2Index] || hslColors[Math.floor(totalColors * 0.9)];
  const highlight = hslColors[highlightIndex] || hslColors[0];
  const accent = hslColors[accentIndex] || hslColors[Math.floor(totalColors * 0.5)];

  return {
    base: {
      name: 'ベース',
      color: rgbToHex(base.r, base.g, base.b),
      percentage: Math.round((baseIndex / totalColors) * 100)
    },
    shadow1: {
      name: '一影',
      color: rgbToHex(shadow1.r, shadow1.g, shadow1.b),
      percentage: Math.round((shadow1Index / totalColors) * 100)
    },
    shadow2: {
      name: '二影',
      color: rgbToHex(shadow2.r, shadow2.g, shadow2.b),
      percentage: Math.round((shadow2Index / totalColors) * 100)
    },
    highlight: {
      name: 'ハイライト',
      color: rgbToHex(highlight.r, highlight.g, highlight.b),
      percentage: Math.round((highlightIndex / totalColors) * 100)
    },
    accent: {
      name: 'アクセント',
      color: rgbToHex(accent.r, accent.g, accent.b),
      percentage: Math.round((accentIndex / totalColors) * 100)
    }
  };
}

export default function HairColorExtractor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<HairColorSet | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    const element = document.createElement('div');
    element.textContent = 'コピーしました！';
    element.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
    document.body.appendChild(element);
    setTimeout(() => document.body.removeChild(element), 2000);
  };

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setExtractedColors(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const extractHairColors = useCallback(async () => {
    if (!uploadedImage || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // キャンバスサイズを設定
        canvas.width = img.width;
        canvas.height = img.height;

        // 画像を描画
        ctx.drawImage(img, 0, 0);

        // ピクセルデータを取得
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 髪色らしい色を抽出（簡易的なフィルタリング）
        const hairColors: { r: number, g: number, b: number }[] = [];
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // 髪色らしい色を判定（簡易版）
          const hsl = rgbToHsl(r, g, b);
          
          // 肌色や背景色を除外
          if (hsl.s > 10 && hsl.l > 10 && hsl.l < 90) {
            // 髪色らしい色相範囲（茶色、金髪、黒髪など）
            if ((hsl.h >= 0 && hsl.h <= 60) || // 黄色〜オレンジ
                (hsl.h >= 300 && hsl.h <= 360) || // ピンク〜赤
                (hsl.h >= 180 && hsl.h <= 240)) { // 青系
              hairColors.push({ r, g, b });
            }
          }
        }

        // 色の数を制限（処理速度向上のため）
        const sampledColors = hairColors.length > 1000 
          ? hairColors.filter((_, index) => index % Math.ceil(hairColors.length / 1000) === 0)
          : hairColors;

        // K-meansクラスタリングで代表色を抽出
        const clusters = kMeansClustering(sampledColors, 5);
        
        // 色を役割に分類
        const classifiedColors = classifyHairColors(clusters);
        
        setExtractedColors(classifiedColors);
      };
      
      img.src = uploadedImage;
    } catch (error) {
      console.error('色抽出エラー:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedImage]);

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        髪色抽出ツール <span className="text-xl">🔍</span>
      </h2>
      
      {/* 画像アップロード */}
      <div className="mb-8 bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
          イラストをアップロード
        </h3>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-500 dark:text-slate-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     dark:file:bg-blue-900/20 dark:file:text-blue-300"
          />
          {uploadedImage && (
            <div className="flex items-center gap-4">
              <img
                src={uploadedImage}
                alt="アップロードされた画像"
                className="w-32 h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
              />
              <button
                onClick={extractHairColors}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {isProcessing ? '抽出中...' : '髪色を抽出'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 抽出された髪色セット */}
      {extractedColors && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-4">
            抽出された髪色セット
          </h3>
          <div className="flex gap-0">
            {Object.entries(extractedColors).map(([key, color]) => (
              <div
                key={key}
                className="flex-1 group cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => {
                  setSelectedColor(color.color);
                  copyToClipboard(color.color);
                }}
              >
                <div
                  className="w-full h-32 border border-slate-200 dark:border-slate-600"
                  style={{ backgroundColor: color.color }}
                />
                <div className="bg-slate-50 dark:bg-slate-700 p-3 border border-slate-200 dark:border-slate-600">
                  <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-1 text-center text-sm">
                    {color.name}
                  </h5>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-300 text-center">
                    {color.color}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    {color.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-2">抽出機能</h5>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• イラストから髪色を自動抽出します</li>
              <li>• K-meansクラスタリングで代表色を抽出</li>
              <li>• 明度・彩度・色相で役割を分類</li>
              <li>• 色をクリックするとHEX値をコピー</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-slate-700 dark:text-slate-200 mb-2">注意事項</h5>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• 髪が明確に描かれている画像を使用</li>
              <li>• 背景がシンプルな画像が精度が高い</li>
              <li>• 抽出結果は参考程度にお使いください</li>
              <li>• 著作権にご注意ください</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 隠しキャンバス */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}