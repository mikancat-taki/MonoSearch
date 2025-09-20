import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Wind } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(query)}`));
    }
  };

  return (
    <div data-filename="pages/SourceCode" data-linenumber="92" data-visual-selector-id="pages/SourceCode92" className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">
      <div data-filename="pages/SourceCode" data-linenumber="93" data-visual-selector-id="pages/SourceCode93" 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop)",
        }}
      >
        <div data-filename="pages/SourceCode" data-linenumber="99" data-visual-selector-id="pages/SourceCode99" className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div data-filename="pages/SourceCode" data-linenumber="102" data-visual-selector-id="pages/SourceCode102" className="relative z-10 flex flex-col items-center">
        <div data-filename="pages/SourceCode" data-linenumber="103" data-visual-selector-id="pages/SourceCode103" className="flex items-center gap-3 mb-6">
          <Wind data-filename="pages/SourceCode" data-linenumber="104" data-visual-selector-id="pages/SourceCode104" className="h-16 w-16 text-white" />
          <h1 data-filename="pages/SourceCode" data-linenumber="105" data-visual-selector-id="pages/SourceCode105" className="text-6xl font-bold text-white tracking-tight">
            Breeze Search
          </h1>
        </div>
        <p data-filename="pages/SourceCode" data-linenumber="109" data-visual-selector-id="pages/SourceCode109" className="text-xl text-gray-200 mb-8 max-w-2xl">
          プライバシーを尊重した、高速でクリーンな検索体験を。
        </p>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl bg-white/20 backdrop-blur-md p-2 rounded-full shadow-2xl"
        >
          <div data-filename="pages/SourceCode" data-linenumber="117" data-visual-selector-id="pages/SourceCode117" className="relative flex items-center">
            <Search data-filename="pages/SourceCode" data-linenumber="118" data-visual-selector-id="pages/SourceCode118" className="absolute left-4 h-6 w-6 text-gray-200" />
            <Input
              type="search"
              placeholder="何を調べていますか？"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-36 bg-transparent text-white text-lg placeholder-gray-300 border-none focus:ring-0"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-11 px-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold transition-all duration-300"
            >
              検索
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}