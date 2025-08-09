import translationEs from "@/assets/locales/es.json";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

const resources = {
    "es-PE" : {
        translation: translationEs
    } 
}

const initI18n = async() => {
    try {
        const lang = getLocales();
        console.log(lang);

        const isRTL = ['ar', 'he', 'fa', 'ur'].includes(lang[0].languageCode!);
            if (isRTL) {
            I18nManager.forceRTL(true);
            I18nManager.allowRTL(true);
            } else {
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
            }

        await i18n
                .use(initReactI18next)
                .init({
                    resources,
                    lng: lang[0].languageCode!,
                    fallbackLng: 'es-PE',
                    interpolation: {
                        escapeValue: false,
                    },
                })
    } catch (error) {
        
    }
}

initI18n();

export default i18n;