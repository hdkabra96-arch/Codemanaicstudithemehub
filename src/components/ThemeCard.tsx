import React from 'react';
import { Star, ShoppingCart, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Theme } from '../types';
import { cn } from '../lib/utils';

interface ThemeCardProps {
  theme: Theme;
  onPreview: (theme: Theme) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onPreview }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 card-hover flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={theme.image}
          alt={theme.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onPreview(theme)}
            className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-brand-500 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink size={18} />
            Live Preview
          </button>
        </div>
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={cn(
            "backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider",
            theme.tier === 'Premium' ? "bg-amber-400/90 text-amber-950" :
            theme.tier === 'Standard' ? "bg-brand-500/90 text-white" :
            "bg-slate-200/90 text-slate-700"
          )}>
            {theme.tier}
          </span>
          {theme.tech.slice(0, 2).map((t) => (
            <span key={t} className="bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
            {theme.title}
          </h3>
          <span className="font-display font-bold text-xl text-slate-900">
            ${theme.price}
          </span>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
          {theme.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Star className="text-amber-400 fill-amber-400" size={16} />
            <span className="text-sm font-bold text-slate-700">{theme.rating}</span>
            <span className="text-xs text-slate-400">({theme.sales})</span>
          </div>
          <div className="text-xs text-slate-400">
            by <span className="text-slate-600 font-medium">{theme.author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
