import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import loginBg from '../assets/nemo-login.jpg';

export function LoginPage() {
  const { login, t, language } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmed.length === 0) {
      return language === 'es'
        ? 'Nos gustaría conocer tu correo. Por favor, escríbelo aquí.'
        : 'We would like to know your email. Please write it here.';
    }
    if (!emailRegex.test(trimmed)) {
      return language === 'es'
        ? 'Parece que falta algo en tu correo, como una "@" o el dominio. ¿Podrías revisarlo?'
        : 'It seems something is missing in your email, like an "@" or the domain. Could you check it?';
    }
    if (trimmed.length > 200) {
      return language === 'es'
        ? 'Este correo es muy extenso. Por favor, intenta con uno más corto, de hasta 200 letras.'
        : 'This email is very long. Please try a shorter one, up to 200 letters.';
    }
    return '';
  };

  const validatePassword = (value: string): string => {
    if (value.trim().length === 0) {
      return language === 'es'
        ? 'Necesitamos tu contraseña para continuar. Puedes escribirla aquí con tranquilidad.'
        : 'We need your password to continue. You can type it here safely.';
    }
    if (value.length < 8) {
      return language === 'es'
        ? 'Tu contraseña es un poquito corta. Te sugerimos usar al menos 8 caracteres.'
        : 'Your password is a little short. We suggest using at least 8 characters.';
    }
    if (value.length > 64) {
      return language === 'es'
        ? 'Tu contraseña es demasiado larga. Prueba con una de hasta 64 caracteres.'
        : 'Your password is too long. Please use up to 64 characters.';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    setAuthError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    setAuthError('');
  };

  const isFormInvalid =
    !email.trim() ||
    !password.trim() ||
    !!errors.email ||
    !!errors.password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) return;

    const usersStr = localStorage.getItem('app_users');
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        login();
        navigate('/');
        return;
      }
    }
    
    // Fake success if user typed "admin@admin.com" (to prevent totally locking them out if they clear storage)
    if (email === 'admin@admin.com' && password === 'admin123') {
        login();
        navigate('/');
        return;
    }

    setAuthError('Correo o contraseña incorrectos.');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center pt-16 p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-[2px]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 relative z-10"
      >
        <div className="p-8 pb-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {t('login.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authError && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm justify-center flex items-center">
                {authError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {t('login.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  aria-invalid={!!errors.email}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400 ml-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  aria-invalid={!!errors.password}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isFormInvalid}
                className="group relative w-full flex items-center justify-center py-2.5 px-4 gap-2 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:text-slate-100 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md shadow-blue-500/20"
              >
                <span>{t('login.submit')}</span>
                <ArrowRight className="h-4 w-4 mt-[2px] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('login.no_account')}{' '}
            <Link to="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
              {t('nav.signup')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}