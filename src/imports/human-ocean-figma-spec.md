Para que vuestro prototipo en Figma sea una réplica exacta y funcional de la memoria de **Human & Ocean**, aquí tenéis una especificación técnica detallada. Esta guía está estructurada para que podáis configurar variables, componentes y estados siguiendo fielmente vuestro diseño horizontal de alta fidelidad.

---

## ## Especificaciones Globales del Sistema (Variables)

Para cumplir con los **Requisitos No Funcionales (RNF)** y funcionales, vuestro archivo de Figma debe contar con las siguientes colecciones de variables:

### ### 1. Apariencia y Contraste (RF-07, RNF-02)

* **Color Palette (Mode: Dark/Light):**
* 
`bg-primary`: Azul muy oscuro/Negro para el modo noche (63.2% de preferencia).


* 
`surface-secondary`: Azul acero degradado para tarjetas y contenedores.


* 
`text-primary`: Blanco puro (high contrast) para garantizar legibilidad.


* 
`accent-critical`: Rojo vibrante para zonas de alta contaminación en el mapa.


* 
`accent-warning`: Amarillo para zonas con contaminación moderada.


* 
`accent-success`: Verde para puntos de interés y logros.





### ### 2. Tipografía Adaptable (RF-13, RNF-01)

* 
**Variable `font-size-base`:** Configurada con pasos numéricos para que el botón "+" y "-" del perfil altere todos los textos de la interfaz simultáneamente.


* 
**Estilo:** Lenguaje cercano, motivador y sin tecnicismos.



---

## ## Estructura de Pantallas (Prototipado Horizontal)

### ### A. Menú Principal y Navegación (RF-05, RNF-05)

* **Navbar Superior:** Siempre visible. Debe incluir el logo de Human & Ocean, accesos a Donaciones, Configuración, Mi Perfil, Cambiar Idioma y el switch de modo noche.


* **Cuerpo Central:**
* 
**Izquierda:** Previsualización dinámica del **Mapa de Impacto**.


* 
**Derecha:** Stack de botones verticales con hover states para: *Racha y liga*, *Juegos*, *Para ti* y *Mapa de impacto*.





### ### B. Mapa de Impacto Interactivo (RF-03)

* 
**Overlay de Onboarding:** Al entrar, debe aparecer un modal azul traslúcido explicando el funcionamiento (desplazar, zoom, puntos verdes).


* **Elementos del Mapa:**
* Capas de calor en costas (ej. Marruecos) con colores rojo y amarillo según gravedad.


* Puntos verdes interactivos que, al clicarlos, abran un tooltip informativo con lenguaje amigable.


* Botones flotantes de Zoom (+/-) en la esquina inferior derecha.





### ### C. Feed "Para ti" (RF-01, RF-12, RF-05)

* 
**UI Estilo Tik Tok:** Vídeo vertical centralizado con fondo desenfocado.


* 
**Interacción Social:** Barra lateral derecha con contador de likes (ej. 799), comentarios (ej. 56) y botón de compartir.


* 
**Funcionalidad de Subtítulos:** Botón dedicado para activar/desactivar la transcripción del audio en tiempo real sobre el vídeo.


* 
**Panel de Comentarios:** Scroll lateral con burbujas de texto de usuarios (ej. Jorge G, Pedro A) y botón de "corazón" para cada comentario.



### ### D. Racha y Liga (RF-02, RF-11)

* 
**Panel Izquierdo:** Contador de "39 días seguidos" con icono de fuego y checklist de los días de la semana (L a D).


* 
**Panel Derecho (División Amatista):** Lista competitiva con nombres (Jorge García, Laura Hernández, etc.) y flechas de ascenso/descenso.


* 
**Acción:** Botón inferior para compartir estos logros en redes sociales.



### ### E. Sección de Juegos y Quizzes (RF-06)

* **Mecánica:** Trivia interactiva. Imagen central de una especie (ej. Medusa) y opciones de selección única a la derecha.


* 
**Progreso:** Indicador de tiempo (54s) y contador de preguntas (ej. 3/10).


* 
**Sugerencias:** Panel lateral "Quizá te interese" con otros retos educativos.



### ### F. Perfil y Trazabilidad de Donaciones (RF-08, RF-09, RF-10)

* **Centro de Impacto:**
* Foto de perfil y nombre de usuario.


* Tarjeta de "Cantidad donada" destacada (ej. 453€).


* Historial con scroll: "Donaste 121€ a la costa de Marruecos", etc.


* 
**Estado de la Inversión:** Gráfico que muestra dónde está el dinero (ej. "Tu dinero acaba de usarse para comprar bolsas de reciclaje").




* 
**Ajustes Rápidos:** Toggles para notificaciones y botones de control de tamaño de fuente (+/-).



---

## ## Interacciones Funcionales para el Prototipo

| Elemento | Acción en Figma | Resultado Esperado |
| --- | --- | --- |
| **Navbar superior** | `Fix position when scrolling` | Menú siempre accesible.

 |
| **Switch Contraste** | `Set Variable (Mode)` | Cambio instantáneo entre tema claro/oscuro.

 |
| **Donaciones (1€, 5€, 10€)** | `On Click -> Navigate to` | Selección de importe y confirmación de impacto real.

 |
| **Pestañas (Feed)** | `On Drag (Swipe)` | Navegación fluida entre vídeos, cumpliendo la preferencia del 33.6%.

 |

¿Te gustaría que generara los **nombres de las capas y componentes en inglés** para vuestro archivo de Figma, manteniendo así el estándar técnico que mencionaste?