"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  voiceGender: "male" | "female";
  setVoiceGender: (gender: "male" | "female") => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("male");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, voiceGender, setVoiceGender }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
