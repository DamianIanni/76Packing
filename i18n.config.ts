import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
import { en } from "./src/i18n/locales/en";
import { es } from "./src/i18n/locales/es";
import { de } from "./src/i18n/locales/de";

const getLanguge = () => {
  const locale = getLocales();
  return locale[0].languageCode;
};

const resources = {
  en: en,
  es: es,
  de: de,
};

i18next.use(initReactI18next).init({
  resources,
  lng: getLanguge() ?? "en",
  debug: true,
  //   lazy: true,
  supportedLngs: ["en", "es", "de"],
  compatibilityJSON: "v4",
  fallbackLng: ["en", "es", "de"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
