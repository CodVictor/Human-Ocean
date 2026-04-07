import { Link } from 'react-router';
import { Home, Waves } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <Waves className="w-24 h-24 mx-auto mb-6 text-[var(--ocean-blue-accent)] opacity-50" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Parece que te has aventurado en aguas desconocidas. Esta página no existe.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ocean-blue-accent)] text-white rounded-full hover:opacity-90 transition-opacity"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}
