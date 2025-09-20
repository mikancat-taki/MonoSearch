import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { InvokeLLM } from '@/integrations/Core';
import { createPageUrl } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Sparkles, List } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SearchResultsPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [isLoadingResults, setIsLoadingResults] = useState(true);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  useEffect(() => {
    if (!query) {
      setIsLoadingResults(false);
      setIsLoadingSummary(false);
      return;
    }

    const fetchAISummary = async () => {
      setIsLoadingSummary(true);
      try {
        const prompt = `「${query}」について、以下の形式で包括的で詳細な日本語の回答を作成してください：

## 概要
[トピックの簡潔な説明]

## 主要なポイント
- [重要なポイント1]
- [重要なポイント2]
- [重要なポイント3]

## 詳細情報
[より詳しい説明、背景、文脈など]

## 関連する情報
[関連するトピック、最新の動向など]

## 参考情報
[信頼できる情報源や追加の調査が推奨される分野]

最新の情報を含め、正確で有用な情報を提供してください。`;

        const response = await InvokeLLM({
          prompt,
          add_context_from_internet: true,
        });

        setAiSummary(response);
      } catch (err) {
        console.error('AI要約の取得中にエラーが発生しました:', err);
        setAiSummary('AI要約の取得中にエラーが発生しました。');
      } finally {
        setIsLoadingSummary(false);
      }
    };

    const fetchSearchResults = async () => {
      setIsLoadingResults(true);
      setError(null);
      try {
        const prompt = `「${query}」についてのウェブ検索結果を、以下のJSON形式で10件返してください。実際の検索結果に基づいて、信頼できるウェブサイトからの情報を含めてください：`;
        const json_schema = {
          type: 'object',
          properties: {
            search_results: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  link: { type: 'string' },
                  snippet: { type: 'string' },
                },
                required: ['title', 'link', 'snippet'],
              },
            },
          },
        };

        const response = await InvokeLLM({
          prompt,
          response_json_schema: json_schema,
          add_context_from_internet: true,
        });

        setResults(response.search_results || []);
      } catch (err) {
        setError('検索結果の取得中にエラーが発生しました。');
        console.error(err);
      } finally {
        setIsLoadingResults(false);
      }
    };

    fetchAISummary();
    fetchSearchResults();
  }, [query]);
  // ...
}