import { useTranslation as translate } from 'react-i18next';

import translations from "@/assets/locales/es.json";

type NestedKeys<T> = {
    [K in keyof T]: T[K] extends object
        ? `${K}.${NestedKeys<T[K]>}`
        : K;
}[keyof T];

type TranslationKeys = NestedKeys<typeof translations>;

export default function useTranslation(){
    const { t } = translate();
    return {
        t: ( key: TranslationKeys ) => t(key),
    };
}