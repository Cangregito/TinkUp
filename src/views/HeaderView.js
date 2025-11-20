/**
 * VIEW - HeaderView
 * Renderiza el header y navegación
 */

export class HeaderView {
    constructor() {
        this.headerElement = document.getElementById('header');
        this.currentPersonId = localStorage.getItem('selectedPerson') || 'jassiel';
    }

    /**
     * Renderiza el header
     * @param {array} persons - Lista de personas disponibles
     */
    render(persons = []) {
        const personOptions = persons.map(person => 
            `<li>
                <button class="person-option ${person.id === this.currentPersonId ? 'active' : ''}" 
                        data-person-id="${person.id}">
                    <div class="person-avatar">
                        <span class="material-icons">account_circle</span>
                    </div>
                    <div class="person-info">
                        <span class="person-name">${person.name}</span>
                        <span class="person-role">${person.role}</span>
                    </div>
                    ${person.id === this.currentPersonId ? '<span class="material-icons check-icon">check_circle</span>' : ''}
                </button>
            </li>`
        ).join('');

        this.headerElement.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">
                        <h1>ThinkUp</h1>
                    </div>

                    <!-- Selector de Persona -->
                    <div class="person-selector-wrapper">
                        <div class="dropdown person-selector" id="person-selector">
                            <button class="dropdown-toggle person-toggle" aria-label="Seleccionar CV">
                                <span class="material-icons">account_circle</span>
                                <span id="current-person-name">
                                    ${persons.find(p => p.id === this.currentPersonId)?.name || 'Seleccionar'}
                                </span>
                                <span class="material-icons">expand_more</span>
                            </button>
                            <ul class="dropdown-menu person-menu">
                                ${personOptions}
                            </ul>
                        </div>
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
                        <!-- Botones de accesibilidad rápida -->
                        <button class="icon-btn accessibility-quick-btn" id="contrast-toggle" 
                                aria-label="Activar/desactivar alto contraste" 
                                title="Alto Contraste (Alt + C)">
                            <span class="material-icons">contrast</span>
                        </button>
                        <button class="icon-btn accessibility-quick-btn" id="font-size-toggle" 
                                aria-label="Aumentar tamaño de texto" 
                                title="Aumentar Texto (Alt + +)">
                            <span class="material-icons">text_fields</span>
                        </button>
                        
                        <!-- Botones generales -->
                        <button class="icon-btn" id="theme-toggle" aria-label="Cambiar tema">
                            <span class="material-icons">dark_mode</span>
                        </button>
                        <button class="icon-btn" id="language-toggle" aria-label="Cambiar idioma">
                            <span class="material-icons">language</span>
                        </button>
                        <button class="icon-btn" id="settings-btn" aria-label="Configuración">
                            <span class="material-icons">settings</span>
                        </button>
                        <button class="icon-btn" id="accessibility-btn" 
                                aria-label="Opciones de accesibilidad" 
                                title="Panel de Accesibilidad (Alt + A)">
                            <span class="material-icons">accessibility_new</span>
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
        const dropdownToggle = document.querySelector('#nav-dropdown .dropdown-toggle');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdown = document.getElementById('nav-dropdown');
        const currentSection = document.getElementById('current-section');

        // Person selector dropdown
        const personSelector = document.getElementById('person-selector');
        const personToggle = document.querySelector('#person-selector .person-toggle');
        
        personToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            personSelector?.classList.toggle('active');
            // Cerrar nav dropdown si está abierto
            dropdown?.classList.remove('active');
            console.log('🖱️ Click en selector de personas');
        });

        // Person selection
        document.querySelectorAll('.person-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const personId = option.getAttribute('data-person-id');
                console.log('👤 Persona seleccionada:', personId);
                this.selectPerson(personId);
                personSelector?.classList.remove('active');
            });
        });

        // Dropdown toggle (navegación)
        dropdownToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown?.classList.toggle('active');
            // Cerrar person selector si está abierto
            personSelector?.classList.remove('active');
        });

        // Cerrar dropdowns al hacer clic fuera
        document.addEventListener('click', () => {
            dropdown?.classList.remove('active');
            personSelector?.classList.remove('active');
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

        // Botón de panel de accesibilidad completo
        const accessibilityBtn = document.getElementById('accessibility-btn');
        accessibilityBtn?.addEventListener('click', () => {
            if (window.accessibilityManager) {
                window.accessibilityManager.toggleAccessibilityPanel();
            } else {
                console.warn('AccessibilityManager no está disponible');
            }
        });

        // Botón de alto contraste rápido
        const contrastToggle = document.getElementById('contrast-toggle');
        contrastToggle?.addEventListener('click', () => {
            if (window.accessibilityManager) {
                window.accessibilityManager.toggleHighContrast();
                // Actualizar icono para indicar estado
                const isActive = window.accessibilityManager.getSettings().highContrast;
                contrastToggle.classList.toggle('active', isActive);
            }
        });

        // Botón de tamaño de fuente rápido
        const fontSizeToggle = document.getElementById('font-size-toggle');
        fontSizeToggle?.addEventListener('click', () => {
            if (window.accessibilityManager) {
                window.accessibilityManager.increaseFontSize();
                // Indicador visual del tamaño actual
                const currentSize = window.accessibilityManager.getSettings().fontSize;
                const sizeIndicators = { 'small': '1', 'normal': '2', 'large': '3', 'extra-large': '4' };
                fontSizeToggle.setAttribute('data-size', sizeIndicators[currentSize]);
            }
        });

        // Inicializar estados visuales de los botones de accesibilidad
        this.updateAccessibilityButtonStates();

        // Hamburger menu (móvil)
        hamburger?.addEventListener('click', () => {
            dropdown?.classList.toggle('mobile-active');
            hamburger?.classList.toggle('active');
        });
    }

    /**
     * Selecciona una persona y dispara evento de cambio
     * @param {string} personId - ID de la persona seleccionada
     */
    selectPerson(personId) {
        console.log('🔄 Cambiando a persona:', personId);
        this.currentPersonId = personId;
        localStorage.setItem('selectedPerson', personId);
        
        // Disparar evento personalizado
        const event = new CustomEvent('personChanged', { 
            detail: { personId } 
        });
        window.dispatchEvent(event);
        console.log('✅ Evento personChanged disparado');
    }

    /**
     * Actualiza los estados visuales de los botones de accesibilidad
     */
    updateAccessibilityButtonStates() {
        if (!window.accessibilityManager) return;

        const settings = window.accessibilityManager.getSettings();
        
        // Actualizar estado del botón de contraste
        const contrastToggle = document.getElementById('contrast-toggle');
        if (contrastToggle) {
            contrastToggle.classList.toggle('active', settings.highContrast);
        }

        // Actualizar indicador de tamaño de fuente
        const fontSizeToggle = document.getElementById('font-size-toggle');
        if (fontSizeToggle) {
            const sizeIndicators = { 'small': '1', 'normal': '2', 'large': '3', 'extra-large': '4' };
            fontSizeToggle.setAttribute('data-size', sizeIndicators[settings.fontSize]);
        }
    }
}
