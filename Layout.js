import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Wind, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(query)}`));
    }
  };

  const isHomePage = location.pathname === createPageUrl("Home");

  return (
    <div data-filename="pages/SourceCode" data-linenumber="33" data-visual-selector-id="pages/SourceCode33" className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {!isHomePage && (
        <header data-filename="pages/SourceCode" data-linenumber="35" data-visual-selector-id="pages/SourceCode35" className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div data-filename="pages/SourceCode" data-linenumber="36" data-visual-selector-id="pages/SourceCode36" className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div data-filename="pages/SourceCode" data-linenumber="37" data-visual-selector-id="pages/SourceCode37" className="flex items-center justify-between h-16">
              <Link data-filename="pages/SourceCode" data-linenumber="38" data-visual-selector-id="pages/SourceCode38" to={createPageUrl("Home")} className="flex items-center gap-2">
                <Wind data-filename="pages/SourceCode" data-linenumber="39" data-visual-selector-id="pages/SourceCode39" className="h-6 w-6 text-blue-500" />
                <h1 data-filename="pages/SourceCode" data-linenumber="40" data-visual-selector-id="pages/SourceCode40" className="text-xl font-bold">Breeze Search</h1>
              </Link>
              <div data-filename="pages/SourceCode" data-linenumber="42" data-visual-selector-id="pages/SourceCode42" className="flex-1 max-w-xl ml-8">
                <form data-filename="pages/SourceCode" data-linenumber="43" data-visual-selector-id="pages/SourceCode43" onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="ウェブを検索..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <Search data-filename="pages/SourceCode" data-linenumber="51" data-visual-selector-id="pages/SourceCode51" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </form>
              </div>
            </div>
          </div>
        </header>
      )}
      <main data-filename="pages/SourceCode" data-linenumber="58" data-visual-selector-id="pages/SourceCode58" className="flex-grow">{children}</main>
      <footer data-filename="pages/SourceCode" data-linenumber="59" data-visual-selector-id="pages/SourceCode59" className="bg-white dark:bg-gray-900">
        <div data-filename="pages/SourceCode" data-linenumber="60" data-visual-selector-id="pages/SourceCode60" className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p data-filename="pages/SourceCode" data-linenumber="61" data-visual-selector-id="pages/SourceCode61">Powered by base44. Search results via DuckDuckGo.</p>
          <div data-filename="pages/SourceCode" data-linenumber="62" data-visual-selector-id="pages/SourceCode62" className="mt-2">
            <Link data-filename="pages/SourceCode" data-linenumber="63" data-visual-selector-id="pages/SourceCode63" to={createPageUrl("SourceCode")} className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors">
              <Code data-filename="pages/SourceCode" data-linenumber="64" data-visual-selector-id="pages/SourceCode64" className="w-4 h-4" />
              <span data-filename="pages/SourceCode" data-linenumber="65" data-visual-selector-id="pages/SourceCode65">View Source Code</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}