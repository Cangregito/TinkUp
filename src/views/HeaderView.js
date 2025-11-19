/**
 * VIEW - HeaderView
 * Renderiza el header y navegación
 */

export class HeaderView {
    constructor() {
        this.headerElement = document.getElementById('header');
    }

    /**
     * Renderiza el header
     */
    render() {
        this.headerElement.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">
                        <h1>ThinkUp</h1>
                    </div>
                    
                    <div class="nav-center">
                        <div class="dropdown" id="nav-dropdown">
                            <button class="dropdown-toggle" aria-label="Menú de navegación">
                                <span id="current-section">Inicio</span>
                                <span class="material-icons">expand_more</span>
                            </button>
                            <ul class="dropdown-menu" id="dropdown-menu">
                                <li><a href="#hero" class="dropdown-item" data-section="Inicio">Inicio</a></li>
                                <li><a href="#projects" class="dropdown-item" data-section="Proyectos">Proyectos</a></li>
                                <li><a href="#experience" class="dropdown-item" data-section="Experiencia">Experiencia</a></li>
                                <li><a href="#skills" class="dropdown-item" data-section="Habilidades">Habilidades</a></li>
                                <li><a href="#about" class="dropdown-item" data-section="Acerca de">Acerca de</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="nav-actions">
                        <button class="icon-btn" id="theme-toggle" aria-label="Cambiar tema">
                            <span class="material-icons">dark_mode</span>
                        </button>
                        <button class="icon-btn" id="language-toggle" aria-label="Cambiar idioma">
                            <span class="material-icons">language</span>
                        </button>
                        <button class="icon-btn" id="settings-btn" aria-label="Configuración">
                            <span class="material-icons">settings</span>
                        </button>
                        <button class="icon-btn" id="accessibility-btn" aria-label="Accesibilidad">
                            <span class="material-icons">accessibility</span>
                        </button>
                    </div>
                    
                    <button class="hamburger" id="hamburger" aria-label="Menú">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        `;

        this.addEventListeners();
    }

    /**
     * Agrega event listeners
     */
    addEventListeners() {
        const hamburger = document.getElementById('hamburger');
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdown = document.getElementById('nav-dropdown');
        const currentSection = document.getElementById('current-section');

        // Dropdown toggle
        dropdownToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown?.classList.toggle('active');
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', () => {
            dropdown?.classList.remove('active');
        });

        // Smooth scroll y actualizar sección activa
        document.querySelectorAll('.dropdown-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                const sectionName = link.getAttribute('data-section');
                
                target?.scrollIntoView({ behavior: 'smooth' });
                currentSection.textContent = sectionName;
                dropdown?.classList.remove('active');
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            
            const icon = themeToggle.querySelector('.material-icons');
            icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
            
            localStorage.setItem('theme', newTheme);
        });

        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeIcon = themeToggle?.querySelector('.material-icons');
        if (themeIcon) {
            themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';
        }

        // Language toggle (placeholder)
        const languageToggle = document.getElementById('language-toggle');
        languageToggle?.addEventListener('click', () => {
            alert('Funcionalidad de cambio de idioma en desarrollo');
        });

        // Settings (placeholder)
        const settingsBtn = document.getElementById('settings-btn');
        settingsBtn?.addEventListener('click', () => {
            alert('Panel de configuración en desarrollo');
        });

        // Accessibility (placeholder)
        const accessibilityBtn = document.getElementById('accessibility-btn');
        accessibilityBtn?.addEventListener('click', () => {
            alert('Opciones de accesibilidad en desarrollo');
        });

        // Hamburger menu (móvil)
        hamburger?.addEventListener('click', () => {
            dropdown?.classList.toggle('mobile-active');
            hamburger?.classList.toggle('active');
        });
    }
}
