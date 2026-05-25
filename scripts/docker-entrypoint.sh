#!/bin/sh
set -eu

node <<'NODE'
const fs = require("node:fs");

const config = {
  companyName: process.env.COMPANY_NAME || "Prime Axis BG Ltd.",
  contactEmail: process.env.CONTACT_EMAIL || "info@primeaxisbg.eu",
  contactPhone: process.env.CONTACT_PHONE || "+359 888 102 811",
  contactPhoneHref: process.env.CONTACT_PHONE_HREF || "+359888102811",
  contactAddress: process.env.CONTACT_ADDRESS || "Dr. Petar Skorchev St. 7, 9010 Varna, Bulgaria",
  whatsappUrl: process.env.WHATSAPP_URL || "https://wa.me/359888102811",
  telegramUrl: process.env.TELEGRAM_URL || "https://t.me/primeaxisbg",
  websiteLabel: process.env.WEBSITE_LABEL || "primeaxisbg.eu",
  footerLocation: process.env.FOOTER_LOCATION || "Varna, Bulgaria",
};

fs.writeFileSync("/app/dist/env.js", `window.__APP_CONFIG__ = ${JSON.stringify(config, null, 2)};\n`);
NODE

exec "$@"
