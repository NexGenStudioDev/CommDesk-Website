import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavbar } from '../hooks/useNavbar';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { toggleSearch } = useNavbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;
      onSearch?.(trimmedQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [onSearch, query]);

  return (
    <div
      onClick={toggleSearch}
      className="group relative hidden xl:flex items-center cursor-pointer"
    >
      <div className="flex items-center gap-2 h-9 w-52 2xl:w-64 rounded-full border border-border bg-muted/40 hover:border-primary/40 hover:bg-muted/70 px-3.5 transition-all duration-200">
        <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Search..."
          aria-label="Search CommDesk"
          data-desktop-search
          className="flex-1 bg-transparent border-0 outline-none text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
        />
        <kbd className="hidden sm:inline-flex h-5 shrink-0 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </div>
    </div>
  );
};
