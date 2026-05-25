import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { EuropeMap } from '@/components/EuropeMap';
import { Reveal } from '@/components/Reveal';

export function Hero() {
  const { t } = useI18n();

  const stats = [
    { label: t('hero.stat1.label'), value: t('hero.stat1.value') },
    { label: t('hero.stat2.label'), value: t('hero.stat2.value') },
    { label: t('hero.stat3.label'), value: t('hero.stat3.value') },
    { label: t('hero.stat4.label'), value: t('hero.stat4.value') },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-muted overflow-hidden">
      {/* subtle ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 40%, hsla(38, 40%, 70%, 0.18), transparent 55%), radial-gradient(ellipse at 10% 90%, hsla(222, 47%, 50%, 0.06), transparent 60%)',
        }}
      />

      {/* Full-bleed Europe map across the whole hero, masked on the left by cream */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 w-full lg:w-[65%] h-full right-0 lg:right-[-6%] hero-map-mask">
          <EuropeMap className="w-full h-full" fit="cover" />
        </div>
        {/* Soft cream gradient covers the left side and fades smoothly into the map — desktop only */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, hsl(var(--muted)) 0%, hsl(var(--muted)) 35%, hsla(40, 25%, 92%, 0.9) 48%, hsla(40, 25%, 92%, 0.55) 62%, hsla(40, 25%, 92%, 0.2) 76%, transparent 90%)',
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between lg:justify-center pt-16 pb-3 sm:pt-20 md:pt-28 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 w-full">
          {/* Top card: tagline + title + subtitle (and on desktop also desc + buttons) */}
          <Reveal direction="up" className="w-full lg:w-[40%] max-w-xl bg-muted/60 backdrop-blur-sm p-3 sm:p-4 lg:bg-transparent lg:backdrop-blur-0 lg:p-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-8">
              <div className="h-px w-8 sm:w-12 bg-primary"></div>
              <span className="text-primary font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs">
                {t('hero.tagline')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-2 sm:mb-3 md:mb-6 text-foreground tracking-tight">
              PRIME AXIS
            </h1>
            <h2 className="text-base sm:text-xl md:text-3xl font-light text-foreground/80 mb-0 md:mb-8 leading-snug">
              Procurement &amp; Trade <span className="text-primary italic font-normal">Consulting</span>
            </h2>

            {/* Desktop-only: description + buttons stay inside the same card */}
            <div className="hidden lg:block">
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-5 md:mb-10 max-w-md">
                {t('hero.desc')}
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <Button
                  size="lg"
                  data-testid="button-services-desktop"
                  className="rounded-none bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 md:h-14 px-5 md:px-8 tracking-wider uppercase text-xs gap-2 md:gap-3 group"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  data-testid="button-learn-more-desktop"
                  className="rounded-none text-foreground hover:bg-transparent hover:text-primary h-11 md:h-14 px-3 md:px-4 tracking-wider uppercase text-xs gap-2 group"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mobile-only bottom card: description + buttons, sits just above the stat strip with a small gap */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 w-full lg:hidden">
          <Reveal direction="up" delay={150} className="w-full max-w-xl bg-muted/60 backdrop-blur-sm p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              {t('hero.desc')}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="lg"
                data-testid="button-services"
                className="rounded-none bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 sm:h-11 px-4 sm:px-5 tracking-wider uppercase text-[11px] sm:text-xs gap-2 group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta.primary')}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                data-testid="button-learn-more"
                className="rounded-none text-foreground hover:bg-transparent hover:text-primary h-10 sm:h-11 px-2 sm:px-3 tracking-wider uppercase text-[11px] sm:text-xs gap-2 group"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Stat strip */}
      <div className="relative z-10 border-t border-border bg-muted/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border">
            {stats.map((stat, i) => {
              const mobileBorders = [
                i % 2 === 0 ? 'border-r border-border md:border-r-0' : '',
                i < 2 ? 'border-b border-border md:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
              <Reveal key={i} direction="up" delay={i * 100} className={`py-3 px-3 md:py-6 md:px-8 group ${mobileBorders}`}>
                <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.18em] mb-0.5 md:mb-1 group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-xs md:text-base font-semibold text-foreground tracking-wide">
                  {stat.value}
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
