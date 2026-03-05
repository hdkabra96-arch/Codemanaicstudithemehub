import React from 'react';
import { Search, Layout, ShoppingBag, User, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
            <Layout size={24} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            Theme<span className="text-brand-600">Hub</span>
          </span>
        </div>

        <div className="flex-grow max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search themes, templates..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-600 hover:text-brand-600 transition-colors md:hidden">
            <Search size={20} />
          </button>
          <button className="p-2 text-slate-600 hover:text-brand-600 transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-600 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
            <User size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </button>
          <button className="p-2 text-slate-600 md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
