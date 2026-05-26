import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Globe2, FileCheck, ShoppingCart, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function Services() {
  const { t } = useI18n();

  const services = [
    { id: 's1', icon: <ShoppingCart className="w-6 h-6" />, titleKey: 'services.s1', descKey: 'services.s1.desc' },
    { id: 's2', icon: <Globe2 className="w-6 h-6" />, titleKey: 'services.s2', descKey: 'services.s2.desc' },
    { id: 's3', icon: <ArrowRightLeft className="w-6 h-6" />, titleKey: 'services.s3', descKey: 'services.s3.desc' },
    { id: 's4', icon: <FileCheck className="w-6 h-6" />, titleKey: 'services.s4', descKey: 'services.s4.desc' },
  ];

  const whyItems = ['why.w1', 'why.w2', 'why.w3', 'why.w4', 'why.w5'];

  return (
    <section id="services" className="min-h-screen lg:min-h-[50vh] flex flex-col justify-center py-12 md:py-16 lg:py-12 bg-muted relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <Reveal direction="right">
          <div className="flex items-end justify-between mb-5 md:mb-10 flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary"></div>
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.15em] text-foreground uppercase">
                {t('services.title')}
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-3 md:gap-5 items-stretch">
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
            {services.map((service, index) => (
              <Reveal key={service.id} direction="up" delay={index * 100}>
              <div
                data-testid={`card-service-${service.id}`}
                className="group bg-card/70 backdrop-blur-md border border-border p-3 md:p-6 hover:border-primary/60 hover:bg-card/85 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-400 flex flex-col h-full"
              >
                <div className="relative mb-2 md:mb-4 w-9 h-9 md:w-12 md:h-12">
                  {/* Animated pulse ring (visible on hover) */}
                  <span
                    className="absolute inset-0 border border-primary/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"
                    style={{ animationDuration: '1.6s' }}
                  />
                  {/* Icon frame: gold border, fills with gold on hover */}
                  <div className="relative w-9 h-9 md:w-12 md:h-12 flex items-center justify-center border border-primary/50 text-primary bg-transparent group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-500 ease-out [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-secondary mb-1.5 md:mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                <p className="text-xs md:text-base text-foreground/90 font-medium leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left" delay={150} className="h-full">
          <div className="bg-secondary text-secondary-foreground p-4 md:p-6 lg:p-8 flex flex-col relative overflow-hidden h-full">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 80% 0%, hsla(38, 60%, 55%, 0.4), transparent 50%)',
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3 md:mb-6">
                <div className="h-px w-8 bg-primary"></div>
                <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
                  {t('why.title')}
                </h3>
              </div>
              <ul className="space-y-2 md:space-y-3.5">
                {whyItems.map((key, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-xs md:text-base text-secondary-foreground/85 leading-relaxed group-hover:text-secondary-foreground transition-colors duration-200">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
