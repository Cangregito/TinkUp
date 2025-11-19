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
│   │   └── components.css    # Componentes reutilizables
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
        └── helpers.js        # Funciones auxiliares
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
