'use client';

import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import ColorPalette from './components/ColorPalette';
import SavedPalettes from './components/SavedPalettes';

export default function Home() {
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);

  const generatePalette = () => {
    const newPalette = generateColorPalette(currentColor);
    setPalette(newPalette);
  };

  const savePalette = () => {
    if (palette.length > 0) {
      setSavedPalettes(prev => [...prev, [...palette]]);
      setPalette([]);
    }
  };

  const deletePalette = (index: number) => {
    setSavedPalettes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Color Palette Creator
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            美しいカラーパレットを作成して、デザインに活用しましょう
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              カラー選択
            </h2>
            <ColorPicker 
              currentColor={currentColor} 
              onColorChange={setCurrentColor} 
            />
            <div className="mt-6 space-y-4">
              <button
                onClick={generatePalette}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                パレットを生成
              </button>
              {palette.length > 0 && (
                <button
                  onClick={savePalette}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  パレットを保存
                </button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              生成されたパレット
            </h2>
            {palette.length > 0 ? (
              <ColorPalette colors={palette} />
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-6xl mb-4">🎨</div>
                <p>カラーを選択してパレットを生成してください</p>
              </div>
            )}
          </div>
        </div>

        {savedPalettes.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              保存されたパレット
            </h2>
            <SavedPalettes 
              palettes={savedPalettes} 
              onDelete={deletePalette} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// カラーパレット生成関数
function generateColorPalette(baseColor: string): string[] {
  const colors = [baseColor];
  
  // 補色
  const complementary = getComplementaryColor(baseColor);
  colors.push(complementary);
  
  // 類似色（30度ずつ）
  const analogous1 = getAnalogousColor(baseColor, 30);
  const analogous2 = getAnalogousColor(baseColor, -30);
  colors.push(analogous1, analogous2);
  
  // トライアド（120度ずつ）
  const triadic1 = getTriadicColor(baseColor, 120);
  const triadic2 = getTriadicColor(baseColor, 240);
  colors.push(triadic1, triadic2);
  
  return colors.slice(0, 6); // 最大6色まで
}

function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const complementary = {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b
  };
  
  return rgbToHex(complementary.r, complementary.g, complementary.b);
}

function getAnalogousColor(hex: string, angle: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newHue = (hsl.h + angle + 360) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
}

function getTriadicColor(hex: string, angle: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newHue = (hsl.h + angle + 360) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
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
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (1/6 <= h && h < 1/3) {
    r = x; g = c; b = 0;
  } else if (1/3 <= h && h < 1/2) {
    r = 0; g = c; b = x;
  } else if (1/2 <= h && h < 2/3) {
    r = 0; g = x; b = c;
  } else if (2/3 <= h && h < 5/6) {
    r = x; g = 0; b = c;
  } else if (5/6 <= h && h <= 1) {
    r = c; g = 0; b = x;
  }
  
  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
}
