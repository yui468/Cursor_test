'use client';

import React, { useState } from 'react';
import { SalesListRequest } from '../types/sales';

interface SalesAgentFormProps {
  onSubmit: (request: SalesListRequest) => void;
  loading: boolean;
}

export default function SalesAgentForm({ onSubmit, loading }: SalesAgentFormProps) {
  const [formData, setFormData] = useState<SalesListRequest>({
    targetIndustry: 'IT・ソフトウェア',
    targetKeywords: ['AI', '機械学習'],
    companySize: 'startup',
    maxProspects: 10,
    newsSources: ['mock']
  });

  const [newKeyword, setNewKeyword] = useState('');

  const handleInputChange = (field: keyof SalesListRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.targetKeywords.includes(newKeyword.trim())) {
      handleInputChange('targetKeywords', [...formData.targetKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = formData.targetKeywords.filter((_, i) => i !== index);
    handleInputChange('targetKeywords', updatedKeywords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 対象業界 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          対象業界
        </label>
        <input
          type="text"
          value={formData.targetIndustry}
          onChange={(e) => handleInputChange('targetIndustry', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: IT・ソフトウェア"
          required
        />
      </div>

      {/* キーワード */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          キーワード
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="新しいキーワードを入力"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            追加
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.targetKeywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 企業規模 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          企業規模
        </label>
        <select
          value={formData.companySize}
          onChange={(e) => handleInputChange('companySize', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="startup">スタートアップ</option>
          <option value="sme">中小企業</option>
          <option value="enterprise">大企業</option>
        </select>
      </div>

      {/* 最大件数 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          最大件数
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={formData.maxProspects}
          onChange={(e) => handleInputChange('maxProspects', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ニュースソース */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ニュースソース
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.newsSources.includes('mock')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleInputChange('newsSources', [...formData.newsSources, 'mock']);
                } else {
                  handleInputChange('newsSources', formData.newsSources.filter(s => s !== 'mock'));
                }
              }}
              className="mr-2"
            />
            <span>モックデータ</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.newsSources.includes('newsapi')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleInputChange('newsSources', [...formData.newsSources, 'newsapi']);
                } else {
                  handleInputChange('newsSources', formData.newsSources.filter(s => s !== 'newsapi'));
                }
              }}
              className="mr-2"
            />
            <span>NewsAPI</span>
          </label>
        </div>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={loading || formData.targetKeywords.length === 0}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '生成中...' : '営業リスト生成'}
      </button>
    </form>
  );
}