/// <reference types="vite/client" />

type AppConfig = {
  companyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactPhoneHref?: string;
  contactAddress?: string;
  whatsappUrl?: string;
  telegramUrl?: string;
  websiteLabel?: string;
  footerLocation?: string;
};

interface Window {
  __APP_CONFIG__?: AppConfig;
}
