import React, { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import logoMark from '@/assets/logo-mark.png';

export function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group"
          data-testid="button-logo"
        >
          <img
            src={logoMark}
            alt="Prime Axis BG"
            className="h-14 md:h-14 lg:h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            draggable={false}
          />
        </button>

        <div className="hidden md:flex items-center gap-10">
          {(['about', 'services', 'markets', 'contact'] as const).map((id) => (
            <button
              key={id}
              data-testid={`link-nav-${id}`}
              onClick={() => scrollToSection(id)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.18em]"
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border border-border bg-card/70 backdrop-blur-sm">
            {(['EN', 'BG'] as const).map((lang) => (
              <button
                key={lang}
                data-testid={`button-lang-${lang.toLowerCase()}`}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider transition-all ${
                  language === lang
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
