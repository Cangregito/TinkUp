# ThinkUp - Portafolio Personal

Portafolio de programación personal desarrollado con arquitectura MVC usando tecnologías nativas.

## 🚀 Características

- ✅ Arquitectura MVC limpia y organizada
- ✅ HTML5, CSS3 y JavaScript vanilla (ES6+)
- ✅ Diseño responsive y mobile-first
- ✅ Sistema de componentes reutilizables
- ✅ Navegación suave (smooth scroll)
- ✅ Formulario de contacto
- ✅ Sección de proyectos dinámica
- ✅ Visualización de habilidades con barras de progreso
- ✅ **Sistema completo de accesibilidad (WCAG)**

## ♿ Funcionalidades de Accesibilidad

### Características Principales

- **Alto Contraste**: Modo de colores de alto contraste para usuarios con discapacidad visual
- **Ajuste de Tamaño de Texto**: 4 niveles de tamaño (pequeño, normal, grande, extra grande)
- **Movimiento Reducido**: Desactiva animaciones para usuarios sensibles al movimiento
- **Navegación por Teclado**: Soporte completo para navegación sin ratón
- **Lectores de Pantalla**: Anuncios ARIA para cambios importantes
- **Skip Links**: Enlace invisible para saltar directamente al contenido principal
- **Persistencia**: Las preferencias se guardan automáticamente en localStorage

### Botones de Acceso Rápido (Header)

En la barra de navegación superior encontrarás:

1. **Botón de Contraste** (icono de contraste)
   - Click para activar/desactivar alto contraste
   - Se marca visualmente cuando está activo
   - Atajo: `Alt + C`

2. **Botón de Tamaño de Fuente** (icono de texto)
   - Click para aumentar el tamaño del texto
   - Muestra un indicador numérico (1-4) del nivel actual
   - Atajo: `Alt + +` (aumentar) / `Alt + -` (disminuir)

3. **Botón de Panel de Accesibilidad** (icono de persona)
   - Abre el panel completo de opciones de accesibilidad
   - Atajo: `Alt + A`

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Alt + A` | Abrir/cerrar panel de accesibilidad |
| `Alt + C` | Activar/desactivar alto contraste |
| `Alt + +` | Aumentar tamaño de texto |
| `Alt + -` | Disminuir tamaño de texto |
| `Ctrl + Home` | Ir al inicio de la página |
| `Ctrl + End` | Ir al final de la página |
| `Tab` | Navegar entre elementos interactivos |
| `Escape` | Cerrar panel de accesibilidad |

### Panel de Accesibilidad

El panel lateral deslizable incluye:

- **Toggle de Alto Contraste**: Interruptor para activar/desactivar
- **Controles de Tamaño de Fuente**: Botones A- y A+ con indicador del tamaño actual
- **Toggle de Movimiento Reducido**: Desactiva todas las animaciones
- **Lista de Atajos**: Referencia rápida de todos los atajos de teclado

### Botón Flotante

Un botón circular con el icono de accesibilidad permanece visible en la esquina inferior derecha de la pantalla para acceso rápido al panel.

### Detección Automática

El sistema detecta automáticamente las preferencias del sistema operativo:

- **prefers-reduced-motion**: Detecta si el usuario ha configurado movimiento reducido en su SO
- **prefers-contrast**: Detecta preferencia de alto contraste
- **prefers-color-scheme**: Adapta el panel al modo oscuro/claro del sistema

### Responsive

- En dispositivos móviles, los botones de acceso rápido se ocultan para ahorrar espacio
- El panel de accesibilidad ocupa toda la pantalla en móviles
- El botón flotante se ajusta al tamaño de la pantalla

## 📁 Estructura del Proyecto

```
ThinkUp/
├── index.html                 # Página principal
├── README.md                  # Documentación
├── public/                    # Archivos públicos
│   ├── css/
│   │   ├── reset.css         # Reset CSS
│   │   ├── variables.css     # Variables CSS (colores, espaciado, etc.)
│   │   ├── main.css          # Estilos principales
│   │   ├── components.css    # Componentes reutilizables
│   │   └── accessibility.css # Estilos de accesibilidad
│   ├── js/
│   │   └── app.js            # Punto de entrada de la aplicación
│   └── assets/
│       └── images/           # Imágenes del portafolio
└── src/                      # Código fuente MVC
    ├── models/               # Models (Lógica de datos)
    │   ├── ProjectModel.js   # Modelo de proyectos
    │   └── SkillModel.js     # Modelo de habilidades
    ├── views/                # Views (Presentación)
    │   ├── HeaderView.js     # Vista del header
    │   ├── ProjectView.js    # Vista de proyectos
    │   └── SkillView.js      # Vista de habilidades
    ├── controllers/          # Controllers (Lógica de negocio)
    │   └── AppController.js  # Controlador principal
    └── utils/                # Utilidades
        ├── helpers.js        # Funciones auxiliares
        └── AccessibilityManager.js  # Gestor de accesibilidad
```

## 🎨 Arquitectura MVC

### Models (Modelos)
Los modelos manejan la lógica de datos:
- `ProjectModel.js`: Gestiona los proyectos (agregar, obtener, filtrar)
- `SkillModel.js`: Gestiona las habilidades y categorías

### Views (Vistas)
Las vistas se encargan de renderizar el HTML:
- `HeaderView.js`: Renderiza el header y navegación
- `ProjectView.js`: Renderiza la sección de proyectos
- `SkillView.js`: Renderiza la sección de habilidades

### Controllers (Controladores)
Los controladores coordinan Models y Views:
- `AppController.js`: Controlador principal que inicializa la aplicación

## 🛠️ Instalación y Uso

### Opción 1: Servidor Local Simple

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (necesitas instalar http-server)
npx http-server -p 8000
```

### Opción 2: Abrir directamente
Simplemente abre `index.html` en tu navegador favorito.

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"

## 📝 Personalización

### Agregar un Nuevo Proyecto

Edita `src/models/ProjectModel.js` y agrega tus proyectos en el método `loadInitialData()`:

```javascript
{
    id: 2,
    title: "Mi Nuevo Proyecto",
    description: "Descripción del proyecto",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "./public/assets/images/proyecto.jpg",
    demoUrl: "https://mi-demo.com",
    githubUrl: "https://github.com/tu-usuario/proyecto"
}
```

### Agregar una Nueva Habilidad

Edita `src/models/SkillModel.js`:

```javascript
{
    id: 5,
    name: "React",
    category: "Frontend",
    level: 85,
    icon: "react"
}
```

### Cambiar Colores

Edita `public/css/variables.css` para personalizar el tema:

```css
:root {
    --primary-color: #tu-color;
    --secondary-color: #tu-color;
    --accent-color: #tu-color;
}
```

## 🎯 Próximas Características

- [ ] Sistema de filtrado de proyectos
- [ ] Animaciones con Intersection Observer
- [ ] Modo oscuro/claro
- [ ] Blog integrado
- [ ] Integración con APIs externas
- [ ] Sistema de comentarios
- [ ] Galería de imágenes mejorada

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Tu Nombre**
- GitHub: [@Cangregito](https://github.com/Cangregito)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- Inspirado en los mejores portafolios de desarrolladores
- Diseño basado en principios de UI/UX modernos

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
Portafolio personal TinkUp
