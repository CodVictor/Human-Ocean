# Human Ocean - Prototipo ODS 14: Vida Submarina 🌊 🌍

**Enlace al Prototipo Interactivo:** [kaleidoscopic-churros-a4c050.netlify.app](https://kaleidoscopic-churros-a4c050.netlify.app/)

**Human Ocean** es una plataforma interactiva de alta fidelidad desarrollada para la asignatura de **Interacción Persona-Ordenador** en la Universidad Rey Juan Carlos. El proyecto tiene como misión principal la concienciación ciudadana sobre el **Objetivo de Desarrollo Sostenible (ODS) 14: Vida Submarina**, promoviendo la conservación de los océanos mediante una experiencia de usuario (UX) inclusiva y gamificada.

## 👥 Nuestro Equipo: UXplorers (Grupo 6)
Integrantes del grado en Ingeniería del Software (URJC):
* Victor Hugo Oliveira Petroceli
* Marcos Hernández Martín
* Ramón Nieto Villegas
* Daniel Hernanz Corral
* Alonso Gutiérrez Sánchez
* Raúl Tejada Merinero

---

## 🎯 Funcionalidades Clave

El sistema ha evolucionado de un diseño estático a una plataforma interactiva con los siguientes módulos:

* 🗺️ **Mapa de Impacto Global:** Visualización de puntos críticos, áreas protegidas y zonas en riesgo mediante un sistema dinámico de capas de calor.
* 📱 **Feed "Para ti":** Galería de vídeos cortos educativos con interfaz adaptada para una navegación fluida al estilo de redes sociales modernas.
* 🎮 **Juegos Educativos:** Quizzes interactivos que proporcionan retroalimentación inmediata (visual y auditiva) para reforzar el aprendizaje.
* 🔥 **Sistema de Racha y Liga:** Fomenta la recurrencia del usuario mediante mecánicas de gamificación y competición amigable.
* 🫂 **Centro de Donaciones:** Trazabilidad de impacto real, permitiendo a los usuarios ver cómo sus contribuciones ayudan a proyectos específicos como la limpieza de playas.

---

## ♿ Usabilidad y Accesibilidad (WAI)

Este prototipo aplica rigurosamente los principios de usabilidad y las pautas de accesibilidad WAI:

1.  **Perceptible:** * Uso de **codificación redundante** en el mapa: los puntos se diferencian por color, forma geométrica (cuadrados, triángulos, círculos) y resplandor dinámico.
    * Inclusión de **subtítulos dinámicos (CC)** y capas de contraste semitransparentes en la sección de vídeos.
    * Control del usuario sobre el **tamaño de la fuente global** y alternancia entre modo claro/oscuro.

2.  **Operable:** * **Navegación completa mediante teclado** (Tabulador y Enter) y áreas de clic ampliadas.
    * Soporte para cambio de contenido mediante **rueda de ratón o flechas del teclado**.
    * Mapa dotado de **físicas de arrastre (*drag*)** y controles de zoom (+/-) precisos.

3.  **Comprensible:** * Uso de **iconografía metafórica intuitiva** (pin de ubicación, fuego para rachas, engranaje para ajustes).
    * **Internacionalización global (ES/EN)** cambiable con un solo clic.
    * **Prevención de errores** con validación de formularios en tiempo real y mensajes de error amigables.

4.  **Robusto:** * Estructura semántica estandarizada en HTML5 y uso de **etiquetas descriptivas (ARIA labels)**.
    * Diseño **responsivo y fluido** adaptado a móvil, tablet y escritorio.
    * Estrategias de **degradación elegante (*fallbacks*)** si un recurso visual falla al cargar.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** React 18 + Vite.
* **Lenguaje:** TypeScript.
* **Estilos:** Tailwind CSS (Claro/Oscuro).
* **Animaciones:** Framer Motion.
* **Iconografía:** Lucide React.

---

## 🚀 Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd Human-Ocean
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el modo desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📁 Estructura del Proyecto

Las rutas y la estructura principal del proyecto se encuentran en el directorio `src/`:

- `/src/app/pages/`: Contiene todas las páginas principales del proyecto (`Home`, `MapPage`, `FeedPage`, `StreakPage`, `GamesPage`, `DonatePage`, etc.).
- `/src/app/components/`: Componentes reutilizables de la interfaz gráfica.
- `/src/app/routes.ts`: Configuración completa del árbol de navegación.
- `/src/app/context/`: Lógica global y manejo del estado de la aplicación.
- `/src/styles/`: Archivos de configuración de diseño (como Tailwind y fuentes globales).

---

## 🤝 Contribuciones

Si deseas sumar a la causa del **ODS 14** a través de código o diseño:
1. Haz un *Fork* del repositorio.
2. Crea tu rama con la nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz *Commit* (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz *Push* de tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un *Pull Request*.

---

## 📁 Evolución del Proyecto
El prototipo nació en **Canva** como un modelo estático (Práctica 1) y fue migrado a **Figma** para su desarrollo interactivo. Finalmente, se ha implementado en código real para maximizar la interactividad y cumplir con los estándares de accesibilidad actuales.

🌿 **Juntos podemos proteger nuestros océanos. Cada píxel cuenta.** 🌊
