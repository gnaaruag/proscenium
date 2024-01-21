import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
     |"ar"
     |"hi"
     |"as"
     |"bn"
     |"bho"
     |"zh"
     |"cs"
     |"en"
     |"fr"
     |"de"
     |"gu"
     |"hu"
     |"ml"
     |"mr"
     |"ne"
     |"pt"
     |"sa"
     |"es"
     |"ta"
     |"te";

export const LanguagesSupportedMap: Record<LanguagesSupported, string>={
    en: "English",
    hi: "Hindi",
    sa: "Sanskrit",
    bn: "Bengali",
    te: "Telugu",
    bho: "Bhojpuri",
    zh: "Chinese",
    cs: "Czech",
    ar: "Arabic",
    fr: "French",
    de: "German",
    gu: "Gujarati",
    hu: "Hungarian",
    ml: "Malayalam",
    mr: "Marathi",
    ne: "Nepali",
    pt: "Portuguese",
    as: "Assamese",
    es: "Spanish",
    ta: "Tamil",
    
    
};
 const Lang_free=5;

interface LanguageState{
    language: LanguagesSupported;
    setLanguage :(language: LanguagesSupported)=>void; 
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro:boolean)=> LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set,get) =>({
    language:'en',
    setLanguage: ( language: LanguagesSupported) => set({language}),
    getLanguages: (isPro: boolean) => {
        if(isPro)
            return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
        
        return Object.keys(LanguagesSupportedMap).slice(
            0,
            Lang_free
        ) as LanguagesSupported[];
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        if (isPro) return [];
        return Object.keys(LanguagesSupportedMap).slice(Lang_free) as LanguagesSupported[];
    },
}))

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription : Subscription | null) => void;


}

export const useSubscriptionStore = create<SubscriptionState>((set)=> ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null ) => set({subscription}),
}));