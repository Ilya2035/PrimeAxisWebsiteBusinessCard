const defaults: Required<AppConfig> = {
  companyName: "Prime Axis BG Ltd.",
  contactEmail: "info@primeaxisbg.eu",
  contactPhone: "+359 888 102 811",
  contactPhoneHref: "+359888102811",
  contactAddress: "Dr. Petar Skorchev St. 7, 9010 Varna, Bulgaria",
  whatsappUrl: "https://wa.me/359888102811",
  telegramUrl: "https://t.me/primeaxisbg",
  websiteLabel: "primeaxisbg.eu",
  footerLocation: "Varna, Bulgaria",
};

const runtimeConfig = window.__APP_CONFIG__ ?? {};

export const contactConfig = {
  ...defaults,
  ...Object.fromEntries(
    Object.entries(runtimeConfig).filter(([, value]) => value !== undefined && value !== ""),
  ),
};
