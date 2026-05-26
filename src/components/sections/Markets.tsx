import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Reveal } from '@/components/Reveal';
import regionEu from '/region-eu.png';
import regionCis from '/region-cis.png';
import regionMe from '/region-me.png';
import regionBg from '/region-bg.png';
import regionGl from '/region-gl.png';

export function Markets() {
  const { t } = useI18n();

  const markets = [
    { key: 'm1', badge: 'EU', img: regionEu },
    { key: 'm2', badge: 'CIS', img: regionCis },
    { key: 'm3', badge: 'ME', img: regionMe },
    { key: 'm4', badge: 'BG', img: regionBg },
    { key: 'm5', badge: 'GL', img: regionGl },
  ];

  return (
    <section id="markets" className="min-h-screen lg:min-h-[50vh] flex flex-col justify-center py-12 md:py-16 lg:py-12 bg-background relative overflow-hidden">
      {/* Looping silk fabric video background (shared with Services) */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={`${import.meta.env.BASE_URL}silk-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Cream wash so cards remain readable */}
      <div className="absolute inset-0 bg-background/55 pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal direction="right">
          <div className="flex items-center gap-4 mb-6 md:mb-14">
            <div className="h-px w-12 bg-primary"></div>
            <h2 className="text-2xl md:text-4xl font-light tracking-[0.15em] text-foreground uppercase">
              {t('markets.title')}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {markets.map((market, idx) => (
            <Reveal
              key={market.key}
              direction="up"
              delay={idx * 90}
              className={
                idx === markets.length - 1
                  ? 'col-span-2 justify-self-center w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)] lg:col-span-1 lg:justify-self-stretch lg:w-auto'
                  : ''
              }
            >
            <div
              data-testid={`card-market-${market.key}`}
              className="group relative bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-500 hover:-translate-y-1 cursor-default overflow-hidden h-full"
            >
              {/* Region image */}
              <div className="relative h-20 md:h-36 overflow-hidden">
                <img
                  src={market.img}
                  alt={t(`markets.${market.key}`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                {/* Bottom fade into card */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card via-card/40 to-transparent" />
                {/* Top-left badge */}
                <span className="absolute top-2 left-2 md:top-3 md:left-3 text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary bg-card/85 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 border border-primary/30">
                  {market.badge}
                </span>
                {/* Top-right pulse dot */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
              </div>

              <div className="p-3 md:p-5 md:pt-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                  {t(`markets.${market.key}`)}
                </h3>
                <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                  {t(`markets.${market.key}.desc`)}
                </p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
