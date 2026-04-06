# Curriculator — The Executive Choice

Generador de CVs profesionales con IA integrada. Construido con React + Vite.

## Inicio rápido

```bash
# 1. Instala dependencias
npm install

# 2. Configura tu API key de Anthropic
cp .env.example .env
# Edita .env y reemplaza con tu key real de https://console.anthropic.com/

# 3. Corre en modo desarrollo
npm run dev
```

Abre http://localhost:5173

## Estructura del proyecto

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Rutas y providers
├── styles/
│   └── global.css        # Variables CSS y estilos base
├── store/
│   └── cvStore.jsx       # Estado global con Context API
├── components/
│   ├── Navbar.jsx        # Barra de navegación sticky
│   ├── CVPreview.jsx     # Renderizador del CV (3 plantillas)
│   └── AIChat.jsx        # Chat con IA para mejoras
└── pages/
    ├── Landing.jsx        # Página principal con hero y features
    ├── TemplateSelector.jsx # Selección de plantilla
    ├── Form.jsx           # Formulario multi-sección
    ├── Generating.jsx     # Pantalla de generación animada
    └── Editor.jsx         # Editor en vivo split-panel
```

## Plantillas disponibles

- **Harvard** — Clásico académico con serif y líneas horizontales
- **Modern** — Header oscuro con avatar y sidebar lateral
- **Ejecutivo** — Elegante con acento dorado/azul y layout en grid

## Variables de entorno

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> ⚠️ Para producción, mueve las llamadas a la API a un backend (Node/Express, Next.js API routes, etc.) para no exponer tu key.

## Build para producción

```bash
npm run build
# Los archivos quedan en /dist
```

## Tecnologías

- React 18
- Vite 5
- React Router DOM 6
- CSS Modules
- Anthropic Claude API (claude-sonnet-4-20250514)
