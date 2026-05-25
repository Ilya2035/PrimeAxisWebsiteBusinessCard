import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'RU';

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
    'about.desc': 'Prime Axis is an international consulting company specializing in procurement, sourcing and trade support in the FMCG and alcoholic beverages sectors. We bridge European and CIS markets with practical expertise, reliable partners, and transparent processes.',
    'about.f1.title': 'Global Network',
    'about.f1.desc': 'Established supplier relationships across European and international markets.',
    'about.f2.title': 'Practical Expertise',
    'about.f2.desc': 'Deep sector knowledge in FMCG, alcohol distribution, and cross-border trade.',
    'about.f3.title': 'Reliable Partners',
    'about.f3.desc': 'We work with verified, trusted counterparts to ensure quality and compliance.',

    'services.title': 'Our Services',
    'services.s1': 'Procurement & Sourcing',
    'services.s1.desc': 'Reliable partners and verified quality across European supply chains.',
    'services.s2': 'FMCG & Alcohol Consulting',
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
  RU: {
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.markets': 'Рынки',
    'nav.contact': 'Контакты',

    'hero.tagline': 'Прокьюремент и торговый консалтинг',
    'hero.desc': 'Связующее звено между рынками Европы и СНГ: практический опыт, надежные партнеры, прозрачные процессы.',
    'hero.cta.primary': 'Наши услуги',
    'hero.cta.secondary': 'Связаться',

    'hero.stat1.label': 'Сеть поставщиков',
    'hero.stat1.value': 'По всей Европе',
    'hero.stat2.label': 'Поддержка закупок',
    'hero.stat2.value': 'Полный цикл',
    'hero.stat3.label': 'Экспертиза',
    'hero.stat3.value': '10+ стран',
    'hero.stat4.label': 'Наш подход',
    'hero.stat4.value': 'Прозрачный процесс',

    'about.title': 'О Prime Axis',
    'about.desc': 'Prime Axis — международная консалтинговая компания, специализирующаяся на прокьюременте, сорсинге и торговом сопровождении в секторах FMCG и алкогольных напитков. Мы соединяем европейские рынки и рынки СНГ.',
    'about.f1.title': 'Глобальная сеть',
    'about.f1.desc': 'Налаженные связи с поставщиками на европейских и международных рынках.',
    'about.f2.title': 'Практическая экспертиза',
    'about.f2.desc': 'Глубокое знание сектора FMCG, дистрибуции алкоголя и трансграничной торговли.',
    'about.f3.title': 'Надежные партнеры',
    'about.f3.desc': 'Мы работаем только с проверенными контрагентами — качество и соответствие стандартам гарантированы.',

    'services.title': 'Наши услуги',
    'services.s1': 'Прокьюремент и Сорсинг',
    'services.s1.desc': 'Надежные партнеры и проверенное качество в европейских цепочках поставок.',
    'services.s2': 'FMCG и Алкогольный Консалтинг',
    'services.s2.desc': 'Стратегия выхода на рынок, ценообразование, нормативное сопровождение.',
    'services.s3': 'Дистрибуция и Ритейл',
    'services.s3.desc': 'Введение в сети дистрибьюторов и доступ к ритейл-каналам.',
    'services.s4': 'Торговые и Агентские Услуги',
    'services.s4.desc': 'Координация импорта/экспорта, документация, логистика и комплаенс.',

    'why.title': 'Почему Prime Axis',
    'why.w1': 'Практическое знание рынка',
    'why.w2': 'Проверенная сеть поставщиков',
    'why.w3': 'Опыт трансграничной торговли',
    'why.w4': 'Гибкий и конфиденциальный подход',
    'why.w5': 'Быстрый отклик и исполнение',

    'markets.title': 'Рынки работы',
    'markets.m1': 'Европейский Союз',
    'markets.m1.desc': 'Полный доступ к рынкам всех стран-членов ЕС.',
    'markets.m2': 'Восточная Европа и СНГ',
    'markets.m2.desc': 'Грузия, Армения, Азербайджан, Казахстан и другие.',
    'markets.m3': 'Ближний Восток',
    'markets.m3.desc': 'ОАЭ, Саудовская Аравия и региональные сети дистрибуции.',
    'markets.m4': 'Болгария (HQ)',
    'markets.m4.desc': 'Наша штаб-квартира и главный шлюз в ЕС.',
    'markets.m5': 'Глобальные Партнеры',
    'markets.m5.desc': 'Выход на новые рынки по запросу.',

    'contact.title': 'Давайте работать вместе',
    'contact.subtitle': 'Мы готовы поддержать ваш рост в Европе и за её пределами.',
    'contact.btn': 'Написать нам',
    'contact.email': 'Эл. почта',
    'contact.phone': 'Телефон',
    'contact.location': 'Адрес',
    'contact.wa': 'WhatsApp',
    'contact.tg': 'Telegram',

    'dock.about': 'О нас',
    'dock.services': 'Услуги',
    'dock.markets': 'Рынки',
    'dock.contact': 'Контакты',
    'dock.top': 'Наверх',
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
