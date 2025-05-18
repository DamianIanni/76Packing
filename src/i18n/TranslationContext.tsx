import React, { useEffect, useState, createContext } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { i18nAsyncStorage } from "../utils/i18nAsyncStorage";

const USER_LANGUAGE = "UserLanguage";

export const TranslationContext = createContext({
  currentLanguage: "en",
  changeLanguage: (_lng: string) => {},
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    i18next.language ?? "en"
  );

  const changeLanguage = async (lng: string) => {
    setCurrentLanguage(lng);
    i18next.changeLanguage(lng);
    await i18nAsyncStorage.setItem(USER_LANGUAGE, lng);
  };

  useEffect(() => {
    const getUserLanguage = async () => {
      const userLanguage = await i18nAsyncStorage.getItem(USER_LANGUAGE);
      if (userLanguage) {
        setCurrentLanguage(userLanguage);
        i18next.changeLanguage(userLanguage);
      }
    };
    getUserLanguage();
  }, []);

  return (
    <TranslationContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useLocale = () => {
  const { currentLanguage, changeLanguage } =
    React.useContext(TranslationContext);
  const { t } = useTranslation();
  return { t, currentLanguage, changeLanguage };
};

export const getTranslation = (key: string, params?: any) => {
  if (!i18next.isInitialized) {
    return "translation not initialized";
  }
  if (!i18next.exists(key)) {
    return `[Missing "en.${key}" translation]`;
  }
  return i18next.t(key, params);
};
