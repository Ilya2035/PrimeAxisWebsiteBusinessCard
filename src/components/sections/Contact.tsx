import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { contactConfig } from '@/config/contact';

export function Contact() {
  const { t } = useI18n();
  const {
    companyName,
    contactEmail,
    contactPhone,
    contactPhoneHref,
    contactAddress,
    whatsappUrl,
    telegramUrl,
    websiteLabel,
    footerLocation,
  } = contactConfig;
  const emailHref = `mailto:${contactEmail}`;
  const phoneHref = `tel:${contactPhoneHref}`;

  return (
    <section id="contact" className="relative overflow-hidden min-h-screen lg:min-h-[50vh] flex flex-col">
      <div className="bg-secondary text-secondary-foreground relative flex-1 flex flex-col justify-center">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 85% 30%, hsla(38, 60%, 55%, 0.35), transparent 55%)',
          }}
        />
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <Reveal direction="right">
              <div className="flex items-center gap-4 mb-5 md:mb-8">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                  {companyName}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide uppercase mb-4 md:mb-6 leading-tight">
                {t('contact.title')}
              </h2>
              <p className="text-secondary-foreground/70 text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-md">
                {t('contact.subtitle')}
              </p>
              <a href={emailHref} data-testid="button-contact-email">
                <Button
                  size="lg"
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 md:h-14 px-8 md:px-10 tracking-wider uppercase text-xs"
                >
                  {t('contact.btn')}
                </Button>
              </a>
            </Reveal>

            <Reveal direction="left" delay={150} className="grid gap-4 md:gap-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: t('contact.email'), value: contactEmail, href: emailHref },
                { icon: <Phone className="w-5 h-5" />, label: t('contact.phone'), value: contactPhone, href: phoneHref },
                { icon: <MapPin className="w-5 h-5" />, label: t('contact.location'), value: contactAddress, href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 flex-shrink-0 border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <span className="group-hover:text-primary-foreground transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary-foreground/50 mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-secondary-foreground hover:text-primary transition-colors duration-200 text-base">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-secondary-foreground text-base">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-5 mt-2 pl-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-whatsapp"
                  className="flex items-center gap-2 text-secondary-foreground/65 hover:text-primary transition-colors duration-200 text-xs font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('contact.wa')}
                </a>
                <span className="text-primary/30">|</span>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-telegram"
                  className="flex items-center gap-2 text-secondary-foreground/65 hover:text-primary transition-colors duration-200 text-xs font-medium"
                >
                  <Send className="w-4 h-4" />
                  {t('contact.tg')}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 py-6 relative">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/40">
            <span>&copy; {new Date().getFullYear()} {companyName} All rights reserved.</span>
            <span>{websiteLabel} &nbsp;·&nbsp; {footerLocation}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
