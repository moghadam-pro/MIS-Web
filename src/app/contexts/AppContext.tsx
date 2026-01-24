import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fa' | 'en';
type Theme = 'light' | 'dark';

interface Company {
  id: string;
  name: string;
  nameFa: string;
}

interface FiscalYear {
  id: string;
  year: string;
  yearFa: string;
  startDate: string;
  endDate: string;
  status: 'open' | 'closing' | 'closed';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  company: Company | null;
  setCompany: (company: Company) => void;
  fiscalYear: FiscalYear | null;
  setFiscalYear: (year: FiscalYear) => void;
  isRTL: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fa');
  const [theme, setThemeState] = useState<Theme>('light');
  const [company, setCompany] = useState<Company | null>({
    id: '1',
    name: 'Sample Company',
    nameFa: 'شرکت نمونه'
  });
  const [fiscalYear, setFiscalYear] = useState<FiscalYear | null>({
    id: '1',
    year: '2025',
    yearFa: '۱۴۰۴',
    startDate: '2025-03-21',
    endDate: '2026-03-20',
    status: 'open'
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  React.useEffect(() => {
    // Initialize RTL and theme on mount
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        company,
        setCompany,
        fiscalYear,
        setFiscalYear,
        isRTL: language === 'fa',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
