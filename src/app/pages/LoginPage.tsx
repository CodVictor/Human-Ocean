import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const { login, t } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 pt-16 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800"
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="ejemplo@correo.com"
                />
              </div>
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md shadow-blue-500/20"
              >
                {t('login.submit')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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