import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const SECTIONS = ['hero', 'about', 'services', 'markets', 'contact'];

const SECTION_DOCK_KEYS: Record<string, string> = {
  hero: 'dock.about',
  about: 'dock.services',
  services: 'dock.markets',
  markets: 'dock.contact',
  contact: 'dock.top',
};

export function ScrollDock() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = () => {
    if (activeSection === 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const currentIdx = SECTIONS.indexOf(activeSection);
    const nextId = SECTIONS[currentIdx + 1];
    if (nextId) document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isLast = activeSection === 'contact';
  const label = t(SECTION_DOCK_KEYS[activeSection] ?? 'dock.about');

  return (
    <button
      onClick={handleClick}
      data-testid="button-scroll-dock"
      aria-label={label}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-secondary/30 hover:shadow-secondary/40 transition-all duration-300"
      style={{ borderRadius: 0 }}
    >
      <span className="hidden md:flex items-center justify-center min-w-[200px] px-8 py-5 text-xs font-semibold tracking-[0.22em] uppercase text-secondary-foreground/80 group-hover:text-primary transition-colors duration-300 whitespace-nowrap text-center">
        {label}
      </span>
      <span className="flex items-center justify-center w-11 h-11 md:w-16 md:h-16 bg-primary group-hover:bg-primary/90 transition-colors duration-300 flex-shrink-0">
        {isLast
          ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          : <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground group-hover:translate-y-0.5 transition-transform duration-300" />
        }
      </span>
    </button>
  );
}
