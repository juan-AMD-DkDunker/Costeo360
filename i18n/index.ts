import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import translationEs from "@/assets/locales/es.json";

const resources = {
    "es-PE" : {
        translation: translationEs
    } 
}

const initI18n = async() => {
    try {
        const lang = getLocales();
        console.log(lang);

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