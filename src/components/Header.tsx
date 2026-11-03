import React from 'react';

interface HeaderProps {
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToForm }) => {
  return (
    <header className="w-full border-b border-border/80 bg-background/95 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-graphite flex items-center justify-center border border-gold/30 shadow-subtle shrink-0">
            <span className="font-serif italic font-semibold text-gold-soft text-base leading-none">
              RV
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-graphite uppercase font-sans truncate">
              Recepção que Vende
            </span>
            <span className="text-[10px] tracking-widest text-gold-deep font-semibold uppercase">
              Edição HOF
            </span>
          </div>
        </div>

        {/* Right CTA */}
        <div className="shrink-0">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gold/50 bg-ivory text-graphite hover:border-gold hover:bg-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-subtle group cursor-pointer"
          >
            <span className="hidden sm:inline">ACESSO POR</span>
            <span>R$ 19,90</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
