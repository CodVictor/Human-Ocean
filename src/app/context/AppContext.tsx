import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';

interface UserProfile {
  name: string;
  avatar: string;
  totalDonated: number;
  streak: number;
}

interface AppContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  login: () => void;
  logout: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  updateProfilePicture: (avatarUrl: string) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    'home.title': 'Human & Ocean',
    'home.subtitle': 'Cuidando nuestro planeta, una ola a la vez.',
    'login.title': 'Bienvenido de nuevo',
    'login.subtitle': 'Ingresa a tu cuenta para continuar.',
    'login.email': 'Correo electrónico',
    'login.password': 'Contraseña',
    'login.submit': 'Iniciar sesión',
    'login.no_account': '¿No tienes cuenta?',
    'signup.title': 'Únete a nosotros',
    'signup.subtitle': 'Crea tu cuenta y empieza a hacer la diferencia.',
    'signup.firstname': 'Nombre',
    'signup.lastname': 'Apellido',
    'signup.email': 'Correo electrónico',
    'signup.password': 'Contraseña',
    'signup.submit': 'Registrarse',
    'signup.has_account': '¿Ya tienes cuenta?',
    'signup.mission': 'Nuestra Misión',
    'signup.mission_text': 'Conectamos a personas comprometidas con la preservación de nuestros océanos y ecosistemas. Juntos podemos crear un impacto ambiental positivo y duradero para las futuras generaciones.',
  },
  en: {
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Log Out',
    'home.title': 'Human & Ocean',
    'home.subtitle': 'Caring for our planet, one wave at a time.',
    'login.title': 'Welcome back',
    'login.subtitle': 'Sign in to your account to continue.',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log In',
    'login.no_account': "Don't have an account?",
    'signup.title': 'Join us',
    'signup.subtitle': 'Create your account and start making a difference.',
    'signup.firstname': 'First Name',
    'signup.lastname': 'Last Name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.submit': 'Sign Up',
    'signup.has_account': 'Already have an account?',
    'signup.mission': 'Our Mission',
    'signup.mission_text': 'We connect people committed to preserving our oceans and ecosystems. Together we can create a positive and lasting environmental impact for future generations.',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Laura Lopez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=faces',
    totalDonated: 453,
    streak: 47,
  });
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // Basic theme effect
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const toggleLanguage = () => setLanguage(prev => prev === 'es' ? 'en' : 'es');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 22));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 12));
  const updateProfilePicture = (avatarUrl: string) => {
    setUser(prev => ({ ...prev, avatar: avatarUrl }));
  };

  const t = (key: string) => translations[language][key as keyof typeof translations['es']] || key;

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        language,
        setLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        updateProfilePicture,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export const useApp = useAppContext;