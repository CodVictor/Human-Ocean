import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Anchor } from 'lucide-react';

export function SignupPage() {
    const { t } = useAppContext();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 pt-16 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row h-auto md:h-[520px]"
            >
                {/* Left Column: Info/Mission */}
                <div className="w-full md:w-5/12 bg-blue-700 dark:bg-blue-900 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M38.5,-58.5C53.6,-48.5,72.1,-43.3,77.5,-31.6C82.9,-20,75.1,-2,68.9,13.2C62.6,28.4,57.9,40.7,48.5,50.7C39.1,60.6,25,68.2,10.6,71.2C-3.8,74.1,-18.5,72.4,-31.6,65.6C-44.6,58.7,-56.1,46.7,-64.3,32.7C-72.5,18.7,-77.3,2.6,-74.6,-11.7C-71.9,-26.1,-61.7,-38.7,-49.6,-49.4C-37.5,-60.1,-23.4,-68.9,-10.1,-68.8C3.2,-68.7,16.4,-59.7,38.5,-58.5Z" transform="translate(200 200)" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-600 dark:bg-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Anchor className="text-white h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">{t('signup.mission')}</h2>
                        <p className="text-blue-100 text-sm leading-relaxed mb-6">
                            {t('signup.mission_text')}
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto hidden md:block">
                        <p className="text-xs text-blue-200">Únete a más de 10,000 activistas</p>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                            {t('signup.title')}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t('signup.subtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                    {t('signup.firstname')}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                        placeholder="Marina"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                    {t('signup.lastname')}
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="García"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                {t('signup.email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                {t('signup.password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md shadow-blue-500/20"
                            >
                                {t('signup.submit')}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {t('signup.has_account')}{' '}
                            <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                                {t('nav.login')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}