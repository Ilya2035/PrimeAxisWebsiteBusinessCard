import React from 'react';
import { Globe2, Users, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Markets } from '@/components/sections/Markets';
import { Contact } from '@/components/sections/Contact';
import { ScrollDock } from '@/components/ScrollDock';
import { useI18n } from '@/lib/i18n';
import { Reveal } from '@/components/Reveal';

function About() {
  const { t } = useI18n();

  const features = [
    { icon: <Globe2 className="w-6 h-6" />, titleKey: 'about.f1.title', descKey: 'about.f1.desc' },
    { icon: <ShieldCheck className="w-6 h-6" />, titleKey: 'about.f2.title', descKey: 'about.f2.desc' },
    { icon: <Users className="w-6 h-6" />, titleKey: 'about.f3.title', descKey: 'about.f3.desc' },
  ];

  return (
    <section id="about" className="min-h-screen lg:min-h-[50vh] flex flex-col justify-center py-12 md:py-16 lg:py-12 bg-background">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
          <Reveal direction="right">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.15em] text-foreground uppercase">
                {t('about.title')}
              </h2>
            </div>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t('about.desc')}
            </p>
          </Reveal>

          <div className="grid gap-3 md:gap-4">
            {features.map((f, i) => (
              <Reveal key={i} direction="left" delay={i * 120}>
                <div
                  data-testid={`card-about-feature-${i}`}
                  className="flex items-start gap-3 md:gap-5 p-3 md:p-5 border border-border hover:border-primary/40 transition-colors duration-300 group"
                >
                  <div className="text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">
                      {t(f.titleKey)}
                    </h3>
                    <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                      {t(f.descKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Markets />
      <Contact />
      <ScrollDock />
    </main>
  );
}
