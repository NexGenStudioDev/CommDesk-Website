import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        return;
      }

      onSearch?.(trimmedQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [onSearch, query]);

  return (
    <div className="group relative hidden xl:block">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search CommDesk"
        autoComplete="off"
        data-desktop-search
        className="h-10 w-40 rounded-full border border-border bg-background/70 pl-10 pr-10 text-sm backdrop-blur-sm transition-all focus:w-52 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 2xl:w-52 2xl:pr-12 2xl:focus:w-60"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <kbd className="hidden 2xl:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
};
