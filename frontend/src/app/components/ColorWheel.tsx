'use client';

import { useState, useRef, useEffect } from 'react';

interface ColorPoint {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface ColorWheelProps {
  onPaletteChange: (colors: string[]) => void;
}

type ColorMode = 'RGB' | 'RYB';
type HarmonyType = 'complementary' | 'split-complementary' | 'triadic' | 'analogous' | 'monochromatic';

export default function ColorWheel({ onPaletteChange }: ColorWheelProps) {
  const [colorMode, setColorMode] = useState<ColorMode>('RGB');
  const [brightness, setBrightness] = useState(50);
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('complementary');
  const [colorPoints, setColorPoints] = useState<ColorPoint[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedPoint, setDraggedPoint] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const wheelSize = 300;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = 120;

  // カラーホイールを描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, wheelSize, wheelSize);

    // カラーホイールを描画
    for (let angle = 0; angle < 360; angle += 1) {
      for (let r = 0; r < radius; r += 1) {
        const hue = colorMode === 'RGB' ? angle : (angle + 180) % 360; // RYBモードでは色相を180度回転
        const saturation = (r / radius) * 100;
        const lightness = brightness;
        
        const color = hslToHex(hue, saturation, lightness);
        ctx.fillStyle = color;
        ctx.fillRect(
          centerX + r * Math.cos((angle * Math.PI) / 180),
          centerY + r * Math.sin((angle * Math.PI) / 180),
          1,
          1
        );
      }
    }

    // カラーポイントを描画
    colorPoints.forEach((point, index) => {
      const x = centerX + point.x;
      const y = centerY + point.y;
      
      // 外側の白い円
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 内側の色円
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = point.color;
      ctx.fill();
      
      // 番号を表示
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), x, y);
    });
  }, [colorMode, brightness, colorPoints]);

  // 配色パターンを適用
  useEffect(() => {
    const newPoints: ColorPoint[] = [];
    
    switch (harmonyType) {
      case 'complementary':
        newPoints.push(
          { id: '1', x: 0, y: -radius * 0.8, color: '#FF0000' },
          { id: '2', x: 0, y: radius * 0.8, color: '#00FFFF' }
        );
        break;
      case 'split-complementary':
        newPoints.push(
          { id: '1', x: 0, y: -radius * 0.8, color: '#FF0000' },
          { id: '2', x: radius * 0.7, y: radius * 0.4, color: '#00FF00' },
          { id: '3', x: -radius * 0.7, y: radius * 0.4, color: '#0000FF' }
        );
        break;
      case 'triadic':
        newPoints.push(
          { id: '1', x: 0, y: -radius * 0.8, color: '#FF0000' },
          { id: '2', x: radius * 0.7, y: radius * 0.4, color: '#00FF00' },
          { id: '3', x: -radius * 0.7, y: radius * 0.4, color: '#0000FF' }
        );
        break;
      case 'analogous':
        newPoints.push(
          { id: '1', x: 0, y: -radius * 0.8, color: '#FF0000' },
          { id: '2', x: radius * 0.4, y: -radius * 0.7, color: '#FF8000' },
          { id: '3', x: -radius * 0.4, y: -radius * 0.7, color: '#8000FF' }
        );
        break;
      case 'monochromatic':
        newPoints.push(
          { id: '1', x: 0, y: -radius * 0.8, color: '#FF0000' },
          { id: '2', x: 0, y: -radius * 0.4, color: '#FF4040' },
          { id: '3', x: 0, y: 0, color: '#FF8080' }
        );
        break;
    }
    
    setColorPoints(newPoints);
  }, [harmonyType]);

  // パレットを更新
  useEffect(() => {
    const colors = colorPoints.map(point => point.color);
    onPaletteChange(colors);
  }, [colorPoints, onPaletteChange]);

  // マウスイベント処理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const distance = Math.sqrt(x * x + y * y);
    
    // 既存のポイントをクリックしたかチェック
    const clickedPoint = colorPoints.find(point => {
      const pointDistance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      return pointDistance <= 15; // クリック範囲
    });
    
    if (clickedPoint) {
      setDraggedPoint(clickedPoint.id);
      return;
    }
    
    // 新しいポイントを追加
    if (distance <= radius) {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      const hue = (angle + 360) % 360;
      const saturation = Math.min((distance / radius) * 100, 100);
      const color = hslToHex(hue, saturation, brightness);
      
      const newPoint: ColorPoint = {
        id: Date.now().toString(),
        x,
        y,
        color
      };
      
      if (colorPoints.length < 5) {
        setColorPoints(prev => [...prev, newPoint]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedPoint || !isEditMode) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance <= radius) {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      const hue = (angle + 360) % 360;
      const saturation = Math.min((distance / radius) * 100, 100);
      const color = hslToHex(hue, saturation, brightness);
      
      setColorPoints(prev => prev.map(point => 
        point.id === draggedPoint 
          ? { ...point, x, y, color }
          : point
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedPoint(null);
  };

  const handlePointDelete = (id: string) => {
    setColorPoints(prev => prev.filter(point => point.id !== id));
  };

  // HSL to HEX変換
  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  };

  // HEX to HSL変換（色の詳細情報表示用）
  const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
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
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  return (
    <div className="space-y-6">
      {/* カラーモード切替 */}
      <div className="flex space-x-2">
        <button
          onClick={() => setColorMode('RGB')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            colorMode === 'RGB'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          RGB
        </button>
        <button
          onClick={() => setColorMode('RYB')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            colorMode === 'RYB'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          RYB
        </button>
      </div>

      {/* 配色パターン */}
      <div className="flex flex-wrap gap-2">
        {[
          { type: 'complementary' as HarmonyType, label: '補色', icon: '⚖️' },
          { type: 'split-complementary' as HarmonyType, label: '分割補色', icon: '🔀' },
          { type: 'triadic' as HarmonyType, label: '三色', icon: '🔺' },
          { type: 'analogous' as HarmonyType, label: '類似色', icon: '🔄' },
          { type: 'monochromatic' as HarmonyType, label: '単色', icon: '🎨' }
        ].map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => setHarmonyType(type)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              harmonyType === type
                ? 'bg-green-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="mr-1">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* カラーホイール */}
      <div className="flex justify-center">
        <div ref={containerRef} className="relative">
          <canvas
            ref={canvasRef}
            width={wheelSize}
            height={wheelSize}
            className="border border-slate-300 dark:border-slate-600 rounded-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* 明度スライダー */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          明度: {brightness}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* カラーパレット表示 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          カラーパレット ({colorPoints.length}/5)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPoints.map((point, index) => (
            <div
              key={point.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-slate-300 dark:border-slate-600"
                  style={{ backgroundColor: point.color }}
                />
                <div className="flex-1">
                  <div className="font-mono text-sm text-slate-900 dark:text-slate-100">
                    {point.color}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    ポイント {index + 1} • HSL({hexToHsl(point.color).h}, {hexToHsl(point.color).s}%, {hexToHsl(point.color).l}%)
                  </div>
                </div>
                {isEditMode && (
                  <button
                    onClick={() => handlePointDelete(point.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 編集・保存ボタン */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isEditMode
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isEditMode ? '編集終了' : '編集モード'}
        </button>
        <button
          onClick={() => {
            const paletteData = {
              colors: colorPoints.map(p => p.color),
              harmonyType,
              colorMode,
              brightness,
              timestamp: new Date().toISOString()
            };
            const dataStr = JSON.stringify(paletteData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `color-palette-${Date.now()}.json`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          保存
        </button>
      </div>
    </div>
  );
}