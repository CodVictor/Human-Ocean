import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  idioma: 'es' | 'en';
  toggleIdioma: () => void;
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  user: {
    name: string;
    avatar: string;
    totalDonated: number;
    streak: number;
  };
  updateProfilePicture: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [userAvatar, setUserAvatar] = useState('https://marketplace.canva.com/EAGl2WpDo0Q/1/0/1600w/canva-foto-de-perfil-de-instagram-mujer-moderno-tQ8K1dL4nno.jpg');
  
  const idioma = language;
  const toggleIdioma = () => setLanguage(prev => prev === 'es' ? 'en' : 'es');

  const user = {
    name: 'Laura Lopez',
    avatar: userAvatar,
    totalDonated: 4533,
    streak: 39
  };

  const updateProfilePicture = (url: string) => {
    setUserAvatar(url);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
  }, [theme, fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <AppContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        fontSize, 
        increaseFontSize, 
        decreaseFontSize,
        idioma,
        toggleIdioma,
        language,
        setLanguage,
        user,
        updateProfilePicture
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
