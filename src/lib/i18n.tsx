import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'BG';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.markets': 'Markets',
    'nav.contact': 'Contact',

    'hero.tagline': 'Procurement & Trade Consulting',
    'hero.desc': 'Bridging European and CIS markets with practical expertise, reliable partners, and transparent processes.',
    'hero.cta.primary': 'Our Services',
    'hero.cta.secondary': 'Contact Us',

    'hero.stat1.label': 'Supplier Network',
    'hero.stat1.value': 'Across Europe',
    'hero.stat2.label': 'Procurement Support',
    'hero.stat2.value': 'End-to-End',
    'hero.stat3.label': 'Market Expertise',
    'hero.stat3.value': '10+ Countries',
    'hero.stat4.label': 'Our Approach',
    'hero.stat4.value': 'Transparent Process',

    'about.title': 'About Prime Axis',
    'about.desc': 'Prime Axis is an international consulting company specializing in procurement, sourcing and trade support in the FMCG sector. We bridge European and CIS markets with practical expertise, reliable partners, and transparent processes.',
    'about.f1.title': 'Global Network',
    'about.f1.desc': 'Established supplier relationships across European and international markets.',
    'about.f2.title': 'Practical Expertise',
    'about.f2.desc': 'Deep sector knowledge in FMCG, distribution, and cross-border trade.',
    'about.f3.title': 'Reliable Partners',
    'about.f3.desc': 'We work with verified, trusted counterparts to ensure quality and compliance.',

    'services.title': 'Our Services',
    'services.s1': 'Procurement & Sourcing',
    'services.s1.desc': 'Reliable partners and verified quality across European supply chains.',
    'services.s2': 'FMCG Consulting',
    'services.s2.desc': 'Market strategy, pricing, regulatory guidance and category development.',
    'services.s3': 'Retail & Distribution Advisory',
    'services.s3.desc': 'Trusted distributor introductions and retail channel access.',
    'services.s4': 'Trade & Agency Services',
    'services.s4.desc': 'Import/export coordination, documentation, logistics and compliance.',

    'why.title': 'Why Choose Us',
    'why.w1': 'Practical market knowledge',
    'why.w2': 'Trusted supplier network',
    'why.w3': 'Cross-border experience',
    'why.w4': 'Flexible & discreet approach',
    'why.w5': 'Fast response & execution',

    'markets.title': 'Markets We Work With',
    'markets.m1': 'European Union',
    'markets.m1.desc': 'Full market access across EU member states.',
    'markets.m2': 'Eastern Europe & CIS',
    'markets.m2.desc': 'Georgia, Armenia, Azerbaijan, Kazakhstan and beyond.',
    'markets.m3': 'Middle East',
    'markets.m3.desc': 'UAE, Saudi Arabia and regional distribution networks.',
    'markets.m4': 'Bulgaria (HQ)',
    'markets.m4.desc': 'Our home base and primary EU gateway.',
    'markets.m5': 'Global Partners',
    'markets.m5.desc': 'Expanding into new markets on demand.',

    'contact.title': "Let's Work Together",
    'contact.subtitle': 'We are ready to support your growth in Europe and beyond.',
    'contact.btn': 'Get in Touch',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.wa': 'WhatsApp',
    'contact.tg': 'Telegram',

    'dock.about': 'About Us',
    'dock.services': 'Services',
    'dock.markets': 'Markets',
    'dock.contact': 'Contact',
    'dock.top': 'Back to Top',
  },
  BG: {
    'nav.about': 'За нас',
    'nav.services': 'Услуги',
    'nav.markets': 'Пазари',
    'nav.contact': 'Контакти',

    'hero.tagline': 'Снабдяване и търговски консултации',
    'hero.desc': 'Свързваме европейските пазари и пазарите от ОНД с практически опит, надеждни партньори и прозрачни процеси.',
    'hero.cta.primary': 'Нашите услуги',
    'hero.cta.secondary': 'Свържете се с нас',

    'hero.stat1.label': 'Мрежа от доставчици',
    'hero.stat1.value': 'В цяла Европа',
    'hero.stat2.label': 'Подкрепа при снабдяване',
    'hero.stat2.value': 'Пълен цикъл',
    'hero.stat3.label': 'Пазарен опит',
    'hero.stat3.value': '10+ държави',
    'hero.stat4.label': 'Нашият подход',
    'hero.stat4.value': 'Прозрачен процес',

    'about.title': 'За Prime Axis',
    'about.desc': 'Prime Axis е международна консултантска компания, специализирана в снабдяване, sourcing и търговска подкрепа в сектора на бързооборотните стоки (FMCG). Свързваме европейските пазари и пазарите от ОНД с практически опит, надеждни партньори и прозрачни процеси.',
    'about.f1.title': 'Глобална мрежа',
    'about.f1.desc': 'Изградени взаимоотношения с доставчици на европейските и международните пазари.',
    'about.f2.title': 'Практически опит',
    'about.f2.desc': 'Задълбочени познания в сектора на FMCG, дистрибуцията и трансграничната търговия.',
    'about.f3.title': 'Надеждни партньори',
    'about.f3.desc': 'Работим само с проверени контрагенти — гарантираме качество и съответствие със стандартите.',

    'services.title': 'Нашите услуги',
    'services.s1': 'Снабдяване и Sourcing',
    'services.s1.desc': 'Надеждни партньори и проверено качество в европейските вериги на доставки.',
    'services.s2': 'FMCG консултации',
    'services.s2.desc': 'Пазарна стратегия, ценообразуване, регулаторно съдействие и развитие на категории.',
    'services.s3': 'Ритейл и Дистрибуция',
    'services.s3.desc': 'Препоръки на доверени дистрибутори и достъп до търговските канали.',
    'services.s4': 'Търговски и Агентски услуги',
    'services.s4.desc': 'Координация на внос/износ, документация, логистика и съответствие.',

    'why.title': 'Защо Prime Axis',
    'why.w1': 'Практически познания за пазара',
    'why.w2': 'Доверена мрежа от доставчици',
    'why.w3': 'Опит в трансграничната търговия',
    'why.w4': 'Гъвкав и дискретен подход',
    'why.w5': 'Бърза реакция и изпълнение',

    'markets.title': 'Пазари, с които работим',
    'markets.m1': 'Европейски съюз',
    'markets.m1.desc': 'Пълен достъп до пазарите на всички страни членки на ЕС.',
    'markets.m2': 'Източна Европа и ОНД',
    'markets.m2.desc': 'Грузия, Армения, Азербайджан, Казахстан и други.',
    'markets.m3': 'Близък Изток',
    'markets.m3.desc': 'ОАЕ, Саудитска Арабия и регионални дистрибуционни мрежи.',
    'markets.m4': 'България (Централа)',
    'markets.m4.desc': 'Нашата централа и основен вход към ЕС.',
    'markets.m5': 'Глобални партньори',
    'markets.m5.desc': 'Излизане на нови пазари при запитване.',

    'contact.title': 'Нека работим заедно',
    'contact.subtitle': 'Готови сме да подкрепим вашия растеж в Европа и извън нея.',
    'contact.btn': 'Свържете се с нас',
    'contact.email': 'Имейл',
    'contact.phone': 'Телефон',
    'contact.location': 'Адрес',
    'contact.wa': 'WhatsApp',
    'contact.tg': 'Telegram',

    'dock.about': 'За нас',
    'dock.services': 'Услуги',
    'dock.markets': 'Пазари',
    'dock.contact': 'Контакти',
    'dock.top': 'Нагоре',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
