import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Anchor } from 'lucide-react';
import registerBg from '../assets/mishi-signup.jpg';

export function SignupPage() {
    const { t, language } = useAppContext();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const validateName = (value: string): string => {
        const trimmed = value.trim();
        if (trimmed.length < 2) {
            return language === 'es'
                ? 'Tu nombre es un poquito corto. Por favor, escribe al menos 2 letras.'
                : 'Your name is a bit short. Please type at least 2 letters.';
        }
        if (trimmed.length > 20) {
            return language === 'es'
                ? 'El nombre que has introducido es demasiado largo. Te sugerimos que uses 20 letras como máximo.'
                : 'The name you entered is a bit too long. We would appreciate it if you use a maximum of 20 letters.';
        }
        return '';
    };

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
                ? 'Necesitamos una contraseña para crear tu cuenta. Puedes escribirla aquí con tranquilidad.'
                : 'We need a password to create your account. You can type it here safely.';
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

    const isFormInvalid =
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim() ||
        !formData.password.trim() ||
        !!errors.firstName ||
        !!errors.lastName ||
        !!errors.email ||
        !!errors.password;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nextErrors = {
            firstName: validateName(formData.firstName),
            lastName: validateName(formData.lastName),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        };
        setErrors(nextErrors);

        if (Object.values(nextErrors).some(Boolean)) return;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'firstName') {
            setErrors((prev) => ({ ...prev, firstName: validateName(value) }));
        } else if (name === 'lastName') {
            setErrors((prev) => ({ ...prev, lastName: validateName(value) }));
        } else if (name === 'email') {
            setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        } else if (name === 'password') {
            setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center pt-16 p-4 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${registerBg})` }}
        >
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-[2px]"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row h-auto md:h-[520px] relative z-10"
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
                <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-transparent">
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
                                        aria-invalid={!!errors.firstName}
                                        className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                        placeholder="Marina"
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-xs text-red-600 dark:text-red-400 ml-1">{errors.firstName}</p>
                                )}
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
                                    aria-invalid={!!errors.lastName}
                                    className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="García"
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-red-600 dark:text-red-400 ml-1">{errors.lastName}</p>
                                )}
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
                                    aria-invalid={!!errors.email}
                                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-600 dark:text-red-400 ml-1">{errors.email}</p>
                            )}
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
                                    aria-invalid={!!errors.password}
                                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                    placeholder="••••••••"
                                />
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
                                <span>{t('signup.submit')}</span>
                                <ArrowRight className="h-4 w-4 mt-[2px] group-hover:translate-x-1 transition-transform" />
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