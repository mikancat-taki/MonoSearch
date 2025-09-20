import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { InvokeLLM } from '@/integrations/Core';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, FileText, Globe, AlertTriangle, Sparkles, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ViewPage() {
  const location = useLocation();
  const [summary, setSummary] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);
  const [error, setError] = useState(null);
  const [iframeError, setIframeError] = useState(false);
  const [activeTab, setActiveTab] = useState('viewer');
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get('url');
  const title = queryParams.get('title');

  useEffect(() => {
    if (!url) {
      setIsLoadingSummary(false);
      setIsLoadingAnalysis(false);
      setError('表示するページのURLが見つかりません。');
      return;
    }

    const fetchContent = async () => {
      // 要約を取得
      try {
        const summaryPrompt = `以下のウェブページの内容を、主要なポイントを箇条書きで含んだ、詳細かつ分かりやすい日本語のマークダウン形式で要約してください。\n\nURL: ${url}`;
        
        const summaryResponse = await InvokeLLM({
          prompt: summaryPrompt,
          add_context_from_internet: true,
        });

        setSummary(summaryResponse);
      } catch (err) {
        console.error('要約の取得中にエラーが発生しました:', err);
      } finally {
        setIsLoadingSummary(false);
      }

      // AI分析を取得
      try {
        const analysisPrompt = `以下のウェブページについて、詳細なAI分析を日本語のマークダウン形式で提供してください：

URL: ${url}

以下の項目を含めて分析してください：
## ページの概要
[ページの主要な内容と目的]

## 重要なポイント
- [主要なポイント1]
- [主要なポイント2]  
- [主要なポイント3]

## 詳細な分析
[コンテンツの詳細な解説、背景、意義など]

## 信頼性の評価
[情報の信頼性、ソース、公開者について]

## 関連情報・追加リソース
[関連するトピックや推奨される追加の調査項目]

## キーワード・タグ
[このページに関連する重要なキーワード]`;

        const analysisResponse = await InvokeLLM({
          prompt: analysisPrompt,
          add_context_from_internet: true,
        });

        setAiAnalysis(analysisResponse);
      } catch (err) {
        console.error('AI分析の取得中にエラーが発生しました:', err);
      } finally {
        setIsLoadingAnalysis(false);
      }
    };

    fetchContent();
  }, [url]);

  const handleIframeError = () => {
    setIframeError(true);
    if (activeTab === 'viewer') {
      setActiveTab('summary');
    }
  };
  
  // ...
}