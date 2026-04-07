import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Plus,
  Minus,
  Save,
  User,
  Globe,
  Moon,
  Sun,
  Camera,
  Upload,
  Trash2,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

// Simple translation dictionary
const t = {
  es: {
    title: "Configuración",
    profileSettings: "Ajustes de Perfil",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    avatarInfo: "Cambiar foto de perfil",
    avatarUpload: "Subir imagen",
    avatarUrl: "O usa una URL",
    saveChanges: "Guardar Cambios",
    saved: "Configuración guardada",
    appearance: "Apariencia y Accesibilidad",
    appTheme: "Tema de la aplicación",
    appThemeDesc: "Cambiar entre modo claro y oscuro",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    language: "Idioma",
    languageDesc: "Selecciona tu idioma preferido",
    fontSize: "Tamaño de fuente",
    notifications: "Notificaciones",
    pushNotifs: "Notificaciones Push",
    pushNotifsDesc:
      "Recibe actualizaciones sobre tus donaciones y logros",
    cannotSave:
      "Hay algunos detalles que revisar antes de guardar. ¡Échales un vistazo! 👆",
    // Tooltips
    changeAvatar: "Cambiar foto de perfil",
    uploadImage: "Subir imagen desde tu dispositivo",
    toggleTheme: "Cambiar entre modo claro y oscuro",
    selectSpanish: "Cambiar idioma a español",
    selectEnglish: "Cambiar idioma a inglés",
    decreaseFontSize: "Disminuir tamaño de fuente",
    increaseFontSize: "Aumentar tamaño de fuente",
    toggleNotifications: "Activar o desactivar notificaciones",
    // Delete account
    dangerZone: "Zona de peligro",
    deleteAccount: "Eliminar cuenta",
    deleteAccountDesc:
      "Esta acción eliminará tu cuenta de forma permanente y no podrá deshacerse.",
    deleteModal: {
      title: "¿Seguro que quieres irte?",
      subtitle:
        "Lamentamos que quieras eliminar tu cuenta. Esta acción es permanente y no podrá deshacerse.",
      confirm:
        "Para confirmarlo, escribe tu correo electrónico:",
      emailPlaceholder: "Tu correo electrónico",
      emailHint: "Escribe exactamente: ",
      emailMismatch:
        "El correo no coincide exactamente con el de tu cuenta. ¿Puedes revisarlo?",
      emailIncomplete:
        "Por favor, escribe tu correo para continuar.",
      back: "No quiero eliminar mi cuenta",
      deleteBtn: "Eliminar definitivamente",
      cannotDelete:
        "Escribe tu correo correctamente para poder continuar.",
      closeModal: "Cerrar y volver",
    },
  },
  en: {
    title: "Settings",
    profileSettings: "Profile Settings",
    fullName: "Full Name",
    email: "Email address",
    avatarInfo: "Change profile picture",
    avatarUpload: "Upload image",
    avatarUrl: "Or use a URL",
    saveChanges: "Save Changes",
    saved: "Settings saved",
    appearance: "Appearance & Accessibility",
    appTheme: "App Theme",
    appThemeDesc: "Toggle between light and dark mode",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    languageDesc: "Select your preferred language",
    fontSize: "Font Size",
    notifications: "Notifications",
    pushNotifs: "Push Notifications",
    pushNotifsDesc:
      "Receive updates about your donations and achievements",
    cannotSave:
      "There are a few things to check before saving. Take a look! 👆",
    // Tooltips
    changeAvatar: "Change profile picture",
    uploadImage: "Upload image from your device",
    toggleTheme: "Toggle between light and dark mode",
    selectSpanish: "Switch language to Spanish",
    selectEnglish: "Switch language to English",
    decreaseFontSize: "Decrease font size",
    increaseFontSize: "Increase font size",
    toggleNotifications: "Toggle notifications on or off",
    // Delete account
    dangerZone: "Danger zone",
    deleteAccount: "Delete account",
    deleteAccountDesc:
      "This action will permanently delete your account and cannot be undone.",
    deleteModal: {
      title: "Are you sure you want to leave?",
      subtitle:
        "We're sorry to see you go. This action is permanent and cannot be undone.",
      confirm: "To confirm, please type your email address:",
      emailPlaceholder: "Your email address",
      emailHint: "Type exactly: ",
      emailMismatch:
        "The email doesn't match your account email exactly. Could you check it?",
      emailIncomplete: "Please enter your email to continue.",
      back: "Go back",
      deleteBtn: "Delete my account",
      cannotDelete: "Type your email correctly to continue.",
      closeModal: "Close and go back",
    },
  },
};

export function Configuracion() {
  const {
    user,
    increaseFontSize,
    decreaseFontSize,
    fontSize,
    theme,
    toggleTheme,
    language,
    setLanguage,
    updateProfilePicture,
  } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEmailInput, setDeleteEmailInput] = useState("");
  const [deleteEmailError, setDeleteEmailError] = useState("");

  const [formData, setFormData] = useState(() => {
    const savedForm = sessionStorage.getItem(
      "profileFormDraft",
    );
    if (savedForm) {
      try {
        return JSON.parse(savedForm);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    return {
      name: user.name,
      email: "laura.lopez@oceanhuman.com",
    };
  });

  useEffect(() => {
    sessionStorage.setItem(
      "profileFormDraft",
      JSON.stringify(formData),
    );
  }, [formData]);

  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dict = t[language];

  // ── Validation helpers ──────────────────────────────────────────────────────
  const validateName = (value: string): string => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      return language === "es"
        ? "Tu nombre es un poquito corto. Por favor, escribe al menos 2 letras."
        : "Your name is a bit short. Please type at least 2 letters.";
    }
    if (trimmed.length > 20) {
      return language === "es"
        ? "El nombre que has introducido es demasiado largo. Te sugerimos que uses 20 letras como máximo."
        : "The name you entered is a bit too long. We would appreciate it if you use a maximum of 20 letters.";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmed.length === 0) {
      return language === "es"
        ? "Nos gustaría conocer tu correo. Por favor, escríbelo aquí."
        : "We would like to know your email. Please write it here.";
    }
    if (!emailRegex.test(trimmed)) {
      return language === "es"
        ? 'Parece que falta algo en tu correo, como una "@" o el dominio. ¿Podrías revisarlo?'
        : 'It seems something is missing in your email, like an "@" or the domain. Could you check it?';
    }
    if (trimmed.length > 200) {
      return language === "es"
        ? "Este correo es muy extenso. Por favor, intenta con uno más corto, de hasta 200 letras."
        : "This email is very long. Please try a shorter one, up to 200 letters.";
    }
    return "";
  };

  const hasErrors = !!(errors.name || errors.email);

  // The account email (source of truth for delete confirmation)
  const accountEmail = formData.email.trim();

  const validateDeleteEmail = (value: string): string => {
    if (value.trim().length === 0)
      return dict.deleteModal.emailIncomplete;
    if (value.trim() !== accountEmail)
      return dict.deleteModal.emailMismatch;
    return "";
  };

  const canDelete =
    deleteEmailInput.trim() === accountEmail &&
    accountEmail.length > 0;

  const handleOpenDeleteModal = () => {
    setDeleteEmailInput("");
    setDeleteEmailError("");
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteEmailInput("");
    setDeleteEmailError("");
  };

  const handleDeleteAccount = () => {
    if (!canDelete) return;
    sessionStorage.clear();
    alert(
      language === "es"
        ? "Tu cuenta ha sido eliminada."
        : "Your account has been deleted.",
    );
    setShowDeleteModal(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Run full validation on submit to catch any untouched fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    setErrors({ name: nameError, email: emailError });

    if (nameError || emailError) return;

    if (avatarUrlInput.trim()) {
      updateProfilePicture(avatarUrlInput);
      setAvatarUrlInput("");
    }

    sessionStorage.removeItem("profileFormDraft");
    alert(dict.saved);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProfilePicture(url);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-8"
          >
            {dict.title}
          </motion.h1>

          <div className="space-y-6">
            {/* Profile Settings Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--ocean-blue-accent)]" />
                {dict.profileSettings}
              </h3>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[var(--ocean-blue-accent)]"
                    />
                    <button
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      title={dict.changeAvatar}
                      aria-label={dict.changeAvatar}
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    title={dict.uploadImage}
                    aria-label={dict.uploadImage}
                    className="text-xs font-semibold text-[var(--ocean-blue-accent)] flex items-center gap-1 hover:underline"
                  >
                    <Upload className="w-3 h-3" />
                    {dict.avatarUpload}
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {dict.avatarUrl}
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={avatarUrlInput}
                    onChange={(e) =>
                      setAvatarUrlInput(e.target.value)
                    }
                    className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ocean-blue-accent)] text-sm"
                  />
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {dict.fullName}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setFormData({
                        ...formData,
                        name: newName,
                      });
                      setErrors((prev) => ({
                        ...prev,
                        name: validateName(newName),
                      }));
                    }}
                    className={`w-full bg-white dark:bg-black/20 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ocean-blue-accent)] ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-black/10 dark:border-white/10"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {dict.email}
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => {
                      const newEmail = e.target.value;
                      setFormData({
                        ...formData,
                        email: newEmail,
                      });
                      setErrors((prev) => ({
                        ...prev,
                        email: validateEmail(newEmail),
                      }));
                    }}
                    className={`w-full bg-white dark:bg-black/20 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ocean-blue-accent)] ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-black/10 dark:border-white/10"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Button row */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={hasErrors}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-white transition-opacity ${
                      hasErrors
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70"
                        : "bg-[var(--ocean-blue-accent)] hover:opacity-90 cursor-pointer"
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {dict.saveChanges}
                  </button>
                  {hasErrors && (
                    <p className="text-red-500 text-xs">
                      {dict.cannotSave}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Appearance Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-[var(--ocean-accent-warning)]" />
                {dict.appearance}
              </h3>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 mb-4 bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {dict.appTheme}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dict.appThemeDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  title={dict.toggleTheme}
                  aria-label={dict.toggleTheme}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
                >
                  {theme === "dark"
                    ? dict.darkMode
                    : dict.lightMode}
                </button>
              </div>

              {/* Language Selection */}
              <div className="flex items-center justify-between p-4 mb-4 bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[var(--ocean-blue-accent)]" />
                  <div>
                    <p className="font-semibold">
                      {dict.language}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dict.languageDesc}
                    </p>
                  </div>
                </div>
                <div className="flex bg-black/10 dark:bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setLanguage("es")}
                    title={dict.selectSpanish}
                    aria-label={dict.selectSpanish}
                    className={`px-3 py-1 rounded-md transition-colors text-sm font-medium ${language === "es" ? "bg-[var(--ocean-blue-accent)] text-white" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    title={dict.selectEnglish}
                    aria-label={dict.selectEnglish}
                    className={`px-3 py-1 rounded-md transition-colors text-sm font-medium ${language === "en" ? "bg-[var(--ocean-blue-accent)] text-white" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Font Size Control */}
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {dict.fontSize}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseFontSize}
                    title={dict.decreaseFontSize}
                    aria-label={dict.decreaseFontSize}
                    className="p-2 bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/30 transition-colors rounded-lg"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="font-semibold">
                      {fontSize}px
                    </span>
                  </div>
                  <button
                    onClick={increaseFontSize}
                    title={dict.increaseFontSize}
                    aria-label={dict.increaseFontSize}
                    className="p-2 bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/30 transition-colors rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notifications Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[var(--ocean-accent-success)]" />
                {dict.notifications}
              </h3>

              <div className="flex items-center justify-between p-4 bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl">
                <div>
                  <p className="font-semibold">
                    {dict.pushNotifs}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dict.pushNotifsDesc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotificationsEnabled(
                      !notificationsEnabled,
                    )
                  }
                  title={dict.toggleNotifications}
                  aria-label={dict.toggleNotifications}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationsEnabled
                      ? "bg-[var(--ocean-accent-success)]"
                      : "bg-black/20 dark:bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notificationsEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 border border-red-300/60 dark:border-[var(--ocean-accent-critical)]/30 bg-red-50/60 dark:bg-[#1a0a0a]/60 shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2 text-[var(--ocean-accent-critical)]">
                <AlertTriangle className="w-5 h-5" />
                {dict.dangerZone}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 mt-3 rounded-xl border border-red-200/60 dark:border-[var(--ocean-accent-critical)]/20 bg-white/40 dark:bg-black/20">
                <div>
                  <p className="font-semibold">
                    {dict.deleteAccount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {dict.deleteAccountDesc}
                  </p>
                </div>
                <button
                  onClick={handleOpenDeleteModal}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-white bg-[var(--ocean-accent-critical)] hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  {dict.deleteAccount}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDeleteModal}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                duration: 0.4,
                bounce: 0.2,
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-7 border border-black/5 dark:border-white/10 shadow-2xl">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--ocean-accent-critical)]/10 border border-[var(--ocean-accent-critical)]/30 flex items-center justify-center">
                    <Trash2 className="w-7 h-7 text-[var(--ocean-accent-critical)]" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-center mb-2">
                  {dict.deleteModal.title}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {dict.deleteModal.subtitle}
                </p>

                {/* Email confirmation */}
                <div className="mb-5">
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {dict.deleteModal.confirm}
                  </label>
                  <p className="text-xs text-muted-foreground mb-2 font-mono bg-black/5 dark:bg-white/5 rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/10">
                    {dict.deleteModal.emailHint}
                    <span className="font-semibold">
                      {accountEmail}
                    </span>
                  </p>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder={
                      dict.deleteModal.emailPlaceholder
                    }
                    value={deleteEmailInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDeleteEmailInput(val);
                      setDeleteEmailError(
                        validateDeleteEmail(val),
                      );
                    }}
                    className={`w-full bg-white dark:bg-black/20 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ocean-accent-critical)] text-sm ${
                      deleteEmailError
                        ? "border-red-500 dark:border-red-500"
                        : deleteEmailInput.length > 0 &&
                            !deleteEmailError
                          ? "border-green-500 dark:border-green-500"
                          : "border-black/10 dark:border-white/10"
                    }`}
                  />
                  {deleteEmailError &&
                    deleteEmailInput.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {deleteEmailError}
                      </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="flex items-center justify-center gap-2 flex-1 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {dict.deleteModal.back}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={!canDelete}
                    className={`flex items-center justify-center gap-2 flex-1 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-opacity ${
                      canDelete
                        ? "bg-[var(--ocean-accent-critical)] hover:opacity-90 cursor-pointer"
                        : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    {dict.deleteModal.deleteBtn}
                  </button>
                </div>

                {/* Cannot delete hint */}
                {!canDelete && deleteEmailInput.length > 0 && (
                  <p className="text-red-500 text-xs text-center mt-3">
                    {dict.deleteModal.cannotDelete}
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}