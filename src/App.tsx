import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Sparkles, ChevronRight, Code2, Globe, Layout, Search } from 'lucide-react';
import { Header } from './components/Header';
import { ThemeCard } from './components/ThemeCard';
import { LivePreview } from './components/LivePreview';
import { MOCK_THEMES, CATEGORIES, TECH_STACKS, Theme } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const filteredThemes = useMemo(() => {
    return MOCK_THEMES.filter((theme) => {
      const matchesCategory = selectedCategory === 'All' || theme.category === selectedCategory;
      const matchesTech = selectedTech === 'All' || theme.tech.includes(selectedTech);
      const matchesSearch = theme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           theme.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [selectedCategory, selectedTech, searchQuery]);

  const scrollToMarketplace = () => {
    setSelectedCategory('All');
    setSelectedTech('All');
    setSearchQuery('');
    document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <AnimatePresence>
        {previewTheme && (
          <LivePreview theme={previewTheme} onClose={() => setPreviewTheme(null)} />
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[140%] bg-brand-600/20 rounded-full blur-[120px] rotate-12"></div>
            <div className="absolute -bottom-[40%] -right-[10%] w-[70%] h-[140%] bg-indigo-600/20 rounded-full blur-[120px] -rotate-12"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
                <Sparkles size={16} />
                Curated Premium Templates
              </span>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 tracking-tight">
                Build your next big idea <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
                  faster than ever.
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                Discover the world's best website templates, UI kits, and themes for your next project. 
                Hand-crafted by top designers and developers.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                  onClick={scrollToMarketplace}
                  className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/25 cursor-pointer"
                >
                  Browse All Themes
                </button>
                <button className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10 cursor-pointer">
                  Sell Your Work
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section id="marketplace" className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Filter size={18} className="text-brand-600" />
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            selectedCategory === cat 
                              ? "bg-brand-50 text-brand-600" 
                              : "text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Code2 size={18} className="text-brand-600" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TECH_STACKS.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => setSelectedTech(tech)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                            selectedTech === tech
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-600 border-slate-200 hover:border-brand-500 hover:text-brand-600"
                          )}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>


                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-slate-900">
                      {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
                    </h2>
                    <p className="text-slate-500 text-sm">Showing {filteredThemes.length} premium results</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Sort by:</span>
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-500">
                      <option>Trending</option>
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Best Rated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredThemes.map((theme) => (
                      <ThemeCard key={theme.id} theme={theme} onPreview={setPreviewTheme} />
                    ))}
                  </AnimatePresence>
                </div>

                {filteredThemes.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Search size={32} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2">No themes found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); setSelectedTech('All'); setSearchQuery(''); }}
                      className="mt-6 text-brand-600 font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                  <Layout size={20} />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">
                  ThemeHub
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The leading marketplace for premium website templates and themes. Empowering creators to build beautiful websites.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-slate-900 mb-6">Marketplace</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-brand-600 transition-colors">All Themes</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Free Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-slate-900 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-brand-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Community Forum</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-slate-900 mb-6">Subscribe</h4>
              <p className="text-sm text-slate-500 mb-4">Get the latest themes and news in your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-grow bg-slate-100 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-500 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2024 ThemeHub Marketplace. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
