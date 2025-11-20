/**
 * AccessibilityManager
 * Gestiona todas las funcionalidades de accesibilidad del sitio
 * Nivel WCAG AAA - Accesibilidad Profesional
 */
class AccessibilityManager {
    constructor() {
        this.settings = {
            // Existentes
            highContrast: false,
            fontSize: 'normal', // 'small', 'normal', 'large', 'extra-large'
            focusIndicator: true,
            reducedMotion: false,
            keyboardNavigation: true,
            
            // Nuevas funcionalidades
            textToSpeech: false,
            speechRate: 1.0, // 0.5 - 2.0
            speechVolume: 1.0, // 0 - 1
            colorBlindMode: 'none', // 'none', 'protanopia', 'deuteranopia', 'tritanopia', 'grayscale'
            lineSpacing: 'normal', // 'compact', 'normal', 'relaxed', 'extra-relaxed'
            letterSpacing: 'normal', // 'compact', 'normal', 'wide', 'extra-wide'
            cursorSize: 'normal', // 'normal', 'large', 'extra-large'
            readingMask: false,
            highlightLinks: false,
            hideImages: false,
            simplifiedMode: false,
            readingGuide: false,
            dyslexiaFont: false,
            currentProfile: 'custom' // 'custom', 'dyslexia', 'low-vision', 'motor', 'adhd'
        };
        
        // TTS
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isSpeaking = false;
        
        this.init();
    }

    /**
     * Inicializa el gestor de accesibilidad
     */
    init() {
        this.loadSettings();
        this.applySettings();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.detectPreferences();
    }

    /**
     * Carga configuraciones guardadas desde localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('accessibility-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('No se pudieron cargar las configuraciones de accesibilidad:', error);
        }
    }

    /**
     * Guarda configuraciones en localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('No se pudieron guardar las configuraciones de accesibilidad:', error);
        }
    }

    /**
     * Aplica todas las configuraciones actuales
     */
    applySettings() {
        this.applyHighContrast();
        this.applyFontSize();
        this.applyReducedMotion();
        this.applyFocusIndicator();
        this.applyColorBlindMode();
        this.applyLineSpacing();
        this.applyLetterSpacing();
        this.applyCursorSize();
        this.applyReadingMask();
        this.applyHighlightLinks();
        this.applyHideImages();
        this.applySimplifiedMode();
        this.applyReadingGuide();
        this.applyDyslexiaFont();
    }

    /**
     * Activa/desactiva modo alto contraste
     */
    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applyHighContrast();
        this.saveSettings();
        this.announceToScreenReader(
            `Modo alto contraste ${this.settings.highContrast ? 'activado' : 'desactivado'}`
        );
    }

    applyHighContrast() {
        if (this.settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
        
        // Notificar cambio a la UI
        this.updateUIState();
    }

    /**
     * Cambia el tamaño de la fuente
     */
    setFontSize(size) {
        const validSizes = ['small', 'normal', 'large', 'extra-large'];
        if (!validSizes.includes(size)) {
            console.warn('Tamaño de fuente no válido:', size);
            return;
        }

        this.settings.fontSize = size;
        this.applyFontSize();
        this.saveSettings();
        
        const sizeLabels = {
            'small': 'pequeño',
            'normal': 'normal',
            'large': 'grande',
            'extra-large': 'extra grande'
        };
        
        this.announceToScreenReader(`Tamaño de fuente cambiado a ${sizeLabels[size]}`);
    }

    applyFontSize() {
        // Remover clases previas de tamaño
        document.documentElement.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large');
        // Agregar clase actual
        document.documentElement.classList.add(`font-${this.settings.fontSize}`);
        
        // Notificar cambio a la UI
        this.updateUIState();
    }

    /**
     * Incrementa el tamaño de fuente
     */
    increaseFontSize() {
        const sizes = ['small', 'normal', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(this.settings.fontSize);
        if (currentIndex < sizes.length - 1) {
            this.setFontSize(sizes[currentIndex + 1]);
        }
    }

    /**
     * Decrementa el tamaño de fuente
     */
    decreaseFontSize() {
        const sizes = ['small', 'normal', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(this.settings.fontSize);
        if (currentIndex > 0) {
            this.setFontSize(sizes[currentIndex - 1]);
        }
    }

    /**
     * Activa/desactiva animaciones reducidas
     */
    toggleReducedMotion() {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.applyReducedMotion();
        this.saveSettings();
        this.announceToScreenReader(
            `Movimiento reducido ${this.settings.reducedMotion ? 'activado' : 'desactivado'}`
        );
    }

    applyReducedMotion() {
        if (this.settings.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    }

    /**
     * Gestión de indicador de foco
     */
    applyFocusIndicator() {
        if (this.settings.focusIndicator) {
            document.documentElement.classList.add('focus-visible');
        } else {
            document.documentElement.classList.remove('focus-visible');
        }
    }

    /**
     * Configuración de navegación por teclado
     */
    setupKeyboardNavigation() {
        // Detectar uso de teclado vs mouse
        let usingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                usingKeyboard = true;
                document.body.classList.add('keyboard-nav');
            }

            // Atajos de teclado
            this.handleKeyboardShortcuts(e);
        });

        document.addEventListener('mousedown', () => {
            usingKeyboard = false;
            document.body.classList.remove('keyboard-nav');
        });

        // Navegación por secciones con teclas
        this.setupSectionNavigation();
    }

    /**
     * Atajos de teclado para accesibilidad
     */
    handleKeyboardShortcuts(e) {
        // Alt + A: Abrir panel de accesibilidad
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            this.toggleAccessibilityPanel();
        }

        // Alt + C: Toggle alto contraste
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            this.toggleHighContrast();
        }

        // Alt + Plus: Aumentar texto
        if (e.altKey && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
            this.increaseFontSize();
        }

        // Alt + Minus: Disminuir texto
        if (e.altKey && e.key === '-') {
            e.preventDefault();
            this.decreaseFontSize();
        }

        // Escape: Cerrar modales o paneles
        if (e.key === 'Escape') {
            this.closeAccessibilityPanel();
        }
    }

    /**
     * Navegación entre secciones principales
     */
    setupSectionNavigation() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        
        document.addEventListener('keydown', (e) => {
            // Ctrl + Home: Ir al inicio
            if (e.ctrlKey && e.key === 'Home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.announceToScreenReader('Navegando al inicio de la página');
            }

            // Ctrl + End: Ir al final
            if (e.ctrlKey && e.key === 'End') {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                this.announceToScreenReader('Navegando al final de la página');
            }
        });
    }

    /**
     * Gestión de foco mejorada
     */
    setupFocusManagement() {
        // Hacer que elementos interactivos sean accesibles
        this.ensureFocusableElements();
        
        // Skip links para saltar al contenido principal
        this.setupSkipLinks();
    }

    /**
     * Asegurar que elementos importantes sean enfocables
     */
    ensureFocusableElements() {
        const interactiveElements = document.querySelectorAll('[data-interactive]');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }

    /**
     * Configurar enlaces de salto (skip links)
     */
    setupSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Detecta preferencias del sistema operativo
     */
    detectPreferences() {
        // Detectar preferencia de movimiento reducido
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches && !localStorage.getItem('accessibility-settings')) {
            this.settings.reducedMotion = true;
            this.applyReducedMotion();
        }

        motionQuery.addEventListener('change', (e) => {
            if (e.matches) {
                this.settings.reducedMotion = true;
                this.applyReducedMotion();
                this.announceToScreenReader('Movimiento reducido detectado en el sistema');
            }
        });

        // Detectar preferencia de contraste
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        if (contrastQuery.matches && !localStorage.getItem('accessibility-settings')) {
            this.settings.highContrast = true;
            this.applyHighContrast();
        }
    }

    /**
     * Anunciar mensajes a lectores de pantalla
     */
    announceToScreenReader(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        // Eliminar después de que se anuncie
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /* ============================================
       NUEVAS FUNCIONALIDADES DE ACCESIBILIDAD
       ============================================ */

    /**
     * TEXT-TO-SPEECH (Lector de Texto)
     */
    toggleTextToSpeech() {
        this.settings.textToSpeech = !this.settings.textToSpeech;
        
        if (this.settings.textToSpeech) {
            this.startTextToSpeech();
        } else {
            this.stopTextToSpeech();
        }
        
        this.saveSettings();
        this.announceToScreenReader(
            `Lector de texto ${this.settings.textToSpeech ? 'activado' : 'desactivado'}`
        );
    }

    startTextToSpeech() {
        // Agregar indicador visual
        document.body.classList.add('tts-active');
        
        // Agregar listeners para leer texto seleccionado
        document.addEventListener('mouseup', this.readSelectedText.bind(this));
        document.addEventListener('keyup', this.readSelectedText.bind(this));
    }

    stopTextToSpeech() {
        document.body.classList.remove('tts-active');
        this.synthesis.cancel();
        this.isSpeaking = false;
        
        document.removeEventListener('mouseup', this.readSelectedText.bind(this));
        document.removeEventListener('keyup', this.readSelectedText.bind(this));
    }

    readSelectedText() {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        if (text.length > 0 && this.settings.textToSpeech) {
            this.speakText(text);
        }
    }

    speakText(text) {
        if (!this.synthesis) return;
        
        // Cancelar cualquier lectura en progreso
        this.synthesis.cancel();
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.rate = this.settings.speechRate;
        this.currentUtterance.volume = this.settings.speechVolume;
        this.currentUtterance.lang = 'es-ES';
        
        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
        };
        
        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
        };
        
        this.synthesis.speak(this.currentUtterance);
    }

    setSpeechRate(rate) {
        this.settings.speechRate = Math.max(0.5, Math.min(2.0, rate));
        this.saveSettings();
    }

    setSpeechVolume(volume) {
        this.settings.speechVolume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    pauseSpeech() {
        if (this.synthesis && this.isSpeaking) {
            this.synthesis.pause();
        }
    }

    resumeSpeech() {
        if (this.synthesis) {
            this.synthesis.resume();
        }
    }

    /**
     * MODOS DE DALTONISMO
     */
    setColorBlindMode(mode) {
        const validModes = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'grayscale', 'inverted'];
        if (!validModes.includes(mode)) return;
        
        this.settings.colorBlindMode = mode;
        this.applyColorBlindMode();
        this.saveSettings();
        
        const modeLabels = {
            'none': 'ninguno',
            'protanopia': 'protanopia (rojo-verde)',
            'deuteranopia': 'deuteranopia (rojo-verde)',
            'tritanopia': 'tritanopia (azul-amarillo)',
            'grayscale': 'escala de grises',
            'inverted': 'colores invertidos'
        };
        
        this.announceToScreenReader(`Modo de daltonismo: ${modeLabels[mode]}`);
    }

    applyColorBlindMode() {
        // Remover todas las clases
        document.documentElement.classList.remove(
            'colorblind-protanopia',
            'colorblind-deuteranopia',
            'colorblind-tritanopia',
            'colorblind-grayscale',
            'colorblind-inverted'
        );
        
        // Agregar la clase correspondiente
        if (this.settings.colorBlindMode !== 'none') {
            document.documentElement.classList.add(`colorblind-${this.settings.colorBlindMode}`);
        }
    }

    /**
     * ESPACIADO DE LÍNEAS
     */
    setLineSpacing(spacing) {
        const validSpacings = ['compact', 'normal', 'relaxed', 'extra-relaxed'];
        if (!validSpacings.includes(spacing)) return;
        
        this.settings.lineSpacing = spacing;
        this.applyLineSpacing();
        this.saveSettings();
        
        this.announceToScreenReader(`Espaciado de líneas: ${spacing}`);
    }

    applyLineSpacing() {
        document.documentElement.classList.remove(
            'line-spacing-compact',
            'line-spacing-normal',
            'line-spacing-relaxed',
            'line-spacing-extra-relaxed'
        );
        document.documentElement.classList.add(`line-spacing-${this.settings.lineSpacing}`);
    }

    /**
     * ESPACIADO DE LETRAS
     */
    setLetterSpacing(spacing) {
        const validSpacings = ['compact', 'normal', 'wide', 'extra-wide'];
        if (!validSpacings.includes(spacing)) return;
        
        this.settings.letterSpacing = spacing;
        this.applyLetterSpacing();
        this.saveSettings();
        
        this.announceToScreenReader(`Espaciado de letras: ${spacing}`);
    }

    applyLetterSpacing() {
        document.documentElement.classList.remove(
            'letter-spacing-compact',
            'letter-spacing-normal',
            'letter-spacing-wide',
            'letter-spacing-extra-wide'
        );
        document.documentElement.classList.add(`letter-spacing-${this.settings.letterSpacing}`);
    }

    /**
     * TAMAÑO DE CURSOR
     */
    setCursorSize(size) {
        const validSizes = ['normal', 'large', 'extra-large'];
        if (!validSizes.includes(size)) return;
        
        this.settings.cursorSize = size;
        this.applyCursorSize();
        this.saveSettings();
        
        this.announceToScreenReader(`Tamaño de cursor: ${size}`);
    }

    applyCursorSize() {
        document.documentElement.classList.remove(
            'cursor-normal',
            'cursor-large',
            'cursor-extra-large'
        );
        document.documentElement.classList.add(`cursor-${this.settings.cursorSize}`);
    }

    /**
     * MÁSCARA DE LECTURA
     */
    toggleReadingMask() {
        this.settings.readingMask = !this.settings.readingMask;
        this.applyReadingMask();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Máscara de lectura ${this.settings.readingMask ? 'activada' : 'desactivada'}`
        );
    }

    applyReadingMask() {
        if (this.settings.readingMask) {
            if (!document.getElementById('reading-mask')) {
                this.createReadingMask();
            }
            document.body.classList.add('reading-mask-active');
        } else {
            document.body.classList.remove('reading-mask-active');
            const mask = document.getElementById('reading-mask');
            if (mask) mask.remove();
        }
    }

    createReadingMask() {
        const mask = document.createElement('div');
        mask.id = 'reading-mask';
        mask.className = 'reading-mask';
        mask.innerHTML = `
            <div class="reading-mask-top"></div>
            <div class="reading-mask-focus"></div>
            <div class="reading-mask-bottom"></div>
        `;
        document.body.appendChild(mask);
        
        // Seguir el mouse
        document.addEventListener('mousemove', (e) => {
            if (this.settings.readingMask) {
                const focusHeight = 100;
                const topHeight = e.clientY - focusHeight / 2;
                
                mask.querySelector('.reading-mask-top').style.height = `${Math.max(0, topHeight)}px`;
                mask.querySelector('.reading-mask-focus').style.top = `${topHeight}px`;
                mask.querySelector('.reading-mask-bottom').style.top = `${topHeight + focusHeight}px`;
            }
        });
    }

    /**
     * RESALTAR ENLACES
     */
    toggleHighlightLinks() {
        this.settings.highlightLinks = !this.settings.highlightLinks;
        this.applyHighlightLinks();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Resaltado de enlaces ${this.settings.highlightLinks ? 'activado' : 'desactivado'}`
        );
    }

    applyHighlightLinks() {
        if (this.settings.highlightLinks) {
            document.body.classList.add('highlight-links');
        } else {
            document.body.classList.remove('highlight-links');
        }
    }

    /**
     * OCULTAR IMÁGENES
     */
    toggleHideImages() {
        this.settings.hideImages = !this.settings.hideImages;
        this.applyHideImages();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Imágenes ${this.settings.hideImages ? 'ocultas' : 'visibles'}`
        );
    }

    applyHideImages() {
        if (this.settings.hideImages) {
            document.body.classList.add('hide-images');
        } else {
            document.body.classList.remove('hide-images');
        }
    }

    /**
     * MODO SIMPLIFICADO
     */
    toggleSimplifiedMode() {
        this.settings.simplifiedMode = !this.settings.simplifiedMode;
        this.applySimplifiedMode();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Modo simplificado ${this.settings.simplifiedMode ? 'activado' : 'desactivado'}`
        );
    }

    applySimplifiedMode() {
        if (this.settings.simplifiedMode) {
            document.body.classList.add('simplified-mode');
        } else {
            document.body.classList.remove('simplified-mode');
        }
    }

    /**
     * GUÍA DE LECTURA
     */
    toggleReadingGuide() {
        this.settings.readingGuide = !this.settings.readingGuide;
        this.applyReadingGuide();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Guía de lectura ${this.settings.readingGuide ? 'activada' : 'desactivada'}`
        );
    }

    applyReadingGuide() {
        if (this.settings.readingGuide) {
            if (!document.getElementById('reading-guide')) {
                this.createReadingGuide();
            }
            document.body.classList.add('reading-guide-active');
        } else {
            document.body.classList.remove('reading-guide-active');
            const guide = document.getElementById('reading-guide');
            if (guide) guide.remove();
        }
    }

    createReadingGuide() {
        const guide = document.createElement('div');
        guide.id = 'reading-guide';
        guide.className = 'reading-guide';
        document.body.appendChild(guide);
        
        document.addEventListener('mousemove', (e) => {
            if (this.settings.readingGuide) {
                guide.style.top = `${e.clientY}px`;
            }
        });
    }

    /**
     * FUENTE PARA DISLEXIA
     */
    toggleDyslexiaFont() {
        this.settings.dyslexiaFont = !this.settings.dyslexiaFont;
        this.applyDyslexiaFont();
        this.saveSettings();
        
        this.announceToScreenReader(
            `Fuente para dislexia ${this.settings.dyslexiaFont ? 'activada' : 'desactivada'}`
        );
    }

    applyDyslexiaFont() {
        if (this.settings.dyslexiaFont) {
            document.body.classList.add('dyslexia-font');
        } else {
            document.body.classList.remove('dyslexia-font');
        }
    }

    /**
     * PERFILES PREDEFINIDOS
     */
    loadProfile(profileName) {
        const profiles = {
            dyslexia: {
                fontSize: 'large',
                lineSpacing: 'extra-relaxed',
                letterSpacing: 'wide',
                dyslexiaFont: true,
                colorBlindMode: 'none',
                reducedMotion: true
            },
            'low-vision': {
                fontSize: 'extra-large',
                highContrast: true,
                cursorSize: 'extra-large',
                lineSpacing: 'relaxed',
                highlightLinks: true,
                colorBlindMode: 'none'
            },
            motor: {
                cursorSize: 'extra-large',
                focusIndicator: true,
                keyboardNavigation: true,
                reducedMotion: true,
                simplifiedMode: true
            },
            adhd: {
                readingMask: true,
                reducedMotion: true,
                simplifiedMode: true,
                hideImages: false,
                fontSize: 'normal'
            },
            colorblind: {
                colorBlindMode: 'deuteranopia',
                highlightLinks: true,
                highContrast: false
            }
        };
        
        if (profiles[profileName]) {
            // Aplicar configuración del perfil
            Object.assign(this.settings, profiles[profileName]);
            this.settings.currentProfile = profileName;
            this.applySettings();
            this.saveSettings();
            
            this.announceToScreenReader(`Perfil ${profileName} cargado`);
        }
    }

    resetToDefault() {
        this.settings = {
            highContrast: false,
            fontSize: 'normal',
            focusIndicator: true,
            reducedMotion: false,
            keyboardNavigation: true,
            textToSpeech: false,
            speechRate: 1.0,
            speechVolume: 1.0,
            colorBlindMode: 'none',
            lineSpacing: 'normal',
            letterSpacing: 'normal',
            cursorSize: 'normal',
            readingMask: false,
            highlightLinks: false,
            hideImages: false,
            simplifiedMode: false,
            readingGuide: false,
            dyslexiaFont: false,
            currentProfile: 'custom'
        };
        
        this.applySettings();
        this.saveSettings();
        this.announceToScreenReader('Configuración restablecida a valores predeterminados');
    }

    /**
     * Crear y mostrar panel de accesibilidad
     */
    createAccessibilityPanel() {
        const panel = document.createElement('aside');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Panel de opciones de accesibilidad');
        panel.setAttribute('aria-hidden', 'true');

        panel.innerHTML = `
            <div class="accessibility-panel__content">
                <div class="accessibility-panel__header">
                    <h2>Opciones de Accesibilidad</h2>
                    <button class="accessibility-panel__close" aria-label="Cerrar panel de accesibilidad">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                
                <div class="accessibility-panel__body">
                    <!-- Perfiles Rápidos -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">person</span> Perfiles Rápidos</h3>
                        <div class="profile-buttons">
                            <button class="profile-btn" data-profile="dyslexia">Dislexia</button>
                            <button class="profile-btn" data-profile="low-vision">Baja Visión</button>
                            <button class="profile-btn" data-profile="motor">Motor</button>
                            <button class="profile-btn" data-profile="adhd">TDAH</button>
                            <button class="profile-btn" data-profile="colorblind">Daltonismo</button>
                        </div>
                    </div>

                    <!-- Lector de Texto -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">record_voice_over</span> Lector de Texto</h3>
                        <label class="accessibility-toggle-label">
                            Activar Lector
                            <input type="checkbox" id="toggle-tts" ${this.settings.textToSpeech ? 'checked' : ''}>
                        </label>
                        <div class="tts-controls" id="tts-controls">
                            <label>
                                Velocidad: <span id="speech-rate-value">${this.settings.speechRate.toFixed(1)}</span>
                                <input type="range" id="speech-rate" min="0.5" max="2" step="0.1" value="${this.settings.speechRate}">
                            </label>
                            <label>
                                Volumen: <span id="speech-volume-value">${Math.round(this.settings.speechVolume * 100)}%</span>
                                <input type="range" id="speech-volume" min="0" max="1" step="0.1" value="${this.settings.speechVolume}">
                            </label>
                        </div>
                    </div>

                    <!-- Visualización -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">visibility</span> Visualización</h3>
                        
                        <label class="accessibility-toggle-label">
                            Alto Contraste
                            <input type="checkbox" id="toggle-contrast" ${this.settings.highContrast ? 'checked' : ''}>
                        </label>

                        <div class="accessibility-control">
                            <span class="control-label">Tamaño de Texto</span>
                            <div class="font-size-controls">
                                <button id="decrease-font" aria-label="Disminuir">A-</button>
                                <span id="current-font-size">${this.getFontSizeLabel()}</span>
                                <button id="increase-font" aria-label="Aumentar">A+</button>
                            </div>
                        </div>

                        <div class="accessibility-control">
                            <label>
                                Modo Daltonismo
                                <select id="colorblind-mode">
                                    <option value="none" ${this.settings.colorBlindMode === 'none' ? 'selected' : ''}>Ninguno</option>
                                    <option value="protanopia" ${this.settings.colorBlindMode === 'protanopia' ? 'selected' : ''}>Protanopia</option>
                                    <option value="deuteranopia" ${this.settings.colorBlindMode === 'deuteranopia' ? 'selected' : ''}>Deuteranopia</option>
                                    <option value="tritanopia" ${this.settings.colorBlindMode === 'tritanopia' ? 'selected' : ''}>Tritanopia</option>
                                    <option value="grayscale" ${this.settings.colorBlindMode === 'grayscale' ? 'selected' : ''}>Escala de Grises</option>
                                    <option value="inverted" ${this.settings.colorBlindMode === 'inverted' ? 'selected' : ''}>Invertido</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <!-- Espaciado y Tipografía -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">format_line_spacing</span> Espaciado</h3>
                        
                        <div class="accessibility-control">
                            <label>
                                Espaciado de Líneas
                                <select id="line-spacing">
                                    <option value="compact" ${this.settings.lineSpacing === 'compact' ? 'selected' : ''}>Compacto</option>
                                    <option value="normal" ${this.settings.lineSpacing === 'normal' ? 'selected' : ''}>Normal</option>
                                    <option value="relaxed" ${this.settings.lineSpacing === 'relaxed' ? 'selected' : ''}>Relajado</option>
                                    <option value="extra-relaxed" ${this.settings.lineSpacing === 'extra-relaxed' ? 'selected' : ''}>Extra Relajado</option>
                                </select>
                            </label>
                        </div>

                        <div class="accessibility-control">
                            <label>
                                Espaciado de Letras
                                <select id="letter-spacing">
                                    <option value="compact" ${this.settings.letterSpacing === 'compact' ? 'selected' : ''}>Compacto</option>
                                    <option value="normal" ${this.settings.letterSpacing === 'normal' ? 'selected' : ''}>Normal</option>
                                    <option value="wide" ${this.settings.letterSpacing === 'wide' ? 'selected' : ''}>Ancho</option>
                                    <option value="extra-wide" ${this.settings.letterSpacing === 'extra-wide' ? 'selected' : ''}>Extra Ancho</option>
                                </select>
                            </label>
                        </div>

                        <label class="accessibility-toggle-label">
                            Fuente para Dislexia
                            <input type="checkbox" id="toggle-dyslexia-font" ${this.settings.dyslexiaFont ? 'checked' : ''}>
                        </label>
                    </div>

                    <!-- Navegación y Enfoque -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">mouse</span> Navegación</h3>
                        
                        <div class="accessibility-control">
                            <label>
                                Tamaño de Cursor
                                <select id="cursor-size">
                                    <option value="normal" ${this.settings.cursorSize === 'normal' ? 'selected' : ''}>Normal</option>
                                    <option value="large" ${this.settings.cursorSize === 'large' ? 'selected' : ''}>Grande</option>
                                    <option value="extra-large" ${this.settings.cursorSize === 'extra-large' ? 'selected' : ''}>Extra Grande</option>
                                </select>
                            </label>
                        </div>

                        <label class="accessibility-toggle-label">
                            Máscara de Lectura
                            <input type="checkbox" id="toggle-reading-mask" ${this.settings.readingMask ? 'checked' : ''}>
                        </label>

                        <label class="accessibility-toggle-label">
                            Guía de Lectura
                            <input type="checkbox" id="toggle-reading-guide" ${this.settings.readingGuide ? 'checked' : ''}>
                        </label>

                        <label class="accessibility-toggle-label">
                            Resaltar Enlaces
                            <input type="checkbox" id="toggle-highlight-links" ${this.settings.highlightLinks ? 'checked' : ''}>
                        </label>
                    </div>

                    <!-- Contenido -->
                    <div class="accessibility-section">
                        <h3><span class="material-icons">auto_awesome</span> Contenido</h3>
                        
                        <label class="accessibility-toggle-label">
                            Modo Simplificado
                            <input type="checkbox" id="toggle-simplified" ${this.settings.simplifiedMode ? 'checked' : ''}>
                        </label>

                        <label class="accessibility-toggle-label">
                            Ocultar Imágenes
                            <input type="checkbox" id="toggle-hide-images" ${this.settings.hideImages ? 'checked' : ''}>
                        </label>

                        <label class="accessibility-toggle-label">
                            Reducir Movimiento
                            <input type="checkbox" id="toggle-motion" ${this.settings.reducedMotion ? 'checked' : ''}>
                        </label>
                    </div>

                    <!-- Restablecer -->
                    <div class="accessibility-section">
                        <button class="btn-reset" id="reset-accessibility">
                            <span class="material-icons">restore</span>
                            Restablecer Todo
                        </button>
                    </div>

                    <!-- Atajos de Teclado -->
                    <div class="accessibility-shortcuts">
                        <h3>Atajos de Teclado</h3>
                        <ul>
                            <li><kbd>Alt</kbd> + <kbd>A</kbd>: Abrir panel</li>
                            <li><kbd>Alt</kbd> + <kbd>C</kbd>: Alto contraste</li>
                            <li><kbd>Alt</kbd> + <kbd>+</kbd>: Aumentar texto</li>
                            <li><kbd>Alt</kbd> + <kbd>-</kbd>: Disminuir texto</li>
                            <li><kbd>Ctrl</kbd> + <kbd>Home</kbd>: Ir al inicio</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.attachPanelEventListeners();
    }

    /**
     * Obtener etiqueta del tamaño de fuente actual
     */
    getFontSizeLabel() {
        const labels = {
            'small': 'Pequeño',
            'normal': 'Normal',
            'large': 'Grande',
            'extra-large': 'Extra Grande'
        };
        return labels[this.settings.fontSize] || 'Normal';
    }

    /**
     * Adjuntar eventos al panel
     */
    attachPanelEventListeners() {
        const panel = document.getElementById('accessibility-panel');
        if (!panel) return;

        // Cerrar panel
        const closeBtn = panel.querySelector('.accessibility-panel__close');
        closeBtn?.addEventListener('click', () => this.closeAccessibilityPanel());

        // ===== PERFILES RÁPIDOS =====
        const profileBtns = panel.querySelectorAll('.profile-btn');
        profileBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const profile = btn.getAttribute('data-profile');
                this.loadProfile(profile);
                this.updateAllControls();
            });
        });

        // ===== LECTOR DE TEXTO =====
        const ttsToggle = panel.querySelector('#toggle-tts');
        ttsToggle?.addEventListener('change', () => this.toggleTextToSpeech());

        const speechRate = panel.querySelector('#speech-rate');
        speechRate?.addEventListener('input', (e) => {
            this.setSpeechRate(parseFloat(e.target.value));
            panel.querySelector('#speech-rate-value').textContent = parseFloat(e.target.value).toFixed(1);
        });

        const speechVolume = panel.querySelector('#speech-volume');
        speechVolume?.addEventListener('input', (e) => {
            this.setSpeechVolume(parseFloat(e.target.value));
            panel.querySelector('#speech-volume-value').textContent = Math.round(e.target.value * 100) + '%';
        });

        // ===== VISUALIZACIÓN =====
        const contrastToggle = panel.querySelector('#toggle-contrast');
        contrastToggle?.addEventListener('change', () => this.toggleHighContrast());

        const colorblindMode = panel.querySelector('#colorblind-mode');
        colorblindMode?.addEventListener('change', (e) => this.setColorBlindMode(e.target.value));

        // ===== TAMAÑO DE FUENTE =====
        const decreaseBtn = panel.querySelector('#decrease-font');
        const increaseBtn = panel.querySelector('#increase-font');
        
        decreaseBtn?.addEventListener('click', () => {
            this.decreaseFontSize();
            this.updateFontSizeLabel();
        });
        
        increaseBtn?.addEventListener('click', () => {
            this.increaseFontSize();
            this.updateFontSizeLabel();
        });

        // ===== ESPACIADO =====
        const lineSpacing = panel.querySelector('#line-spacing');
        lineSpacing?.addEventListener('change', (e) => this.setLineSpacing(e.target.value));

        const letterSpacing = panel.querySelector('#letter-spacing');
        letterSpacing?.addEventListener('change', (e) => this.setLetterSpacing(e.target.value));

        const dyslexiaFontToggle = panel.querySelector('#toggle-dyslexia-font');
        dyslexiaFontToggle?.addEventListener('change', () => this.toggleDyslexiaFont());

        // ===== NAVEGACIÓN =====
        const cursorSize = panel.querySelector('#cursor-size');
        cursorSize?.addEventListener('change', (e) => this.setCursorSize(e.target.value));

        const readingMaskToggle = panel.querySelector('#toggle-reading-mask');
        readingMaskToggle?.addEventListener('change', () => this.toggleReadingMask());

        const readingGuideToggle = panel.querySelector('#toggle-reading-guide');
        readingGuideToggle?.addEventListener('change', () => this.toggleReadingGuide());

        const highlightLinksToggle = panel.querySelector('#toggle-highlight-links');
        highlightLinksToggle?.addEventListener('change', () => this.toggleHighlightLinks());

        // ===== CONTENIDO =====
        const simplifiedToggle = panel.querySelector('#toggle-simplified');
        simplifiedToggle?.addEventListener('change', () => this.toggleSimplifiedMode());

        const hideImagesToggle = panel.querySelector('#toggle-hide-images');
        hideImagesToggle?.addEventListener('change', () => this.toggleHideImages());

        const motionToggle = panel.querySelector('#toggle-motion');
        motionToggle?.addEventListener('change', () => this.toggleReducedMotion());

        // ===== RESTABLECER =====
        const resetBtn = panel.querySelector('#reset-accessibility');
        resetBtn?.addEventListener('click', () => {
            if (confirm('¿Restablecer todas las configuraciones de accesibilidad?')) {
                this.resetToDefault();
                this.updateAllControls();
                this.closeAccessibilityPanel();
                setTimeout(() => this.openAccessibilityPanel(), 100);
            }
        });

        // Cerrar con Escape
        panel.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAccessibilityPanel();
            }
        });

        // Trap focus dentro del panel
        this.trapFocus(panel);
    }

    /**
     * Actualizar todos los controles del panel
     */
    updateAllControls() {
        const panel = document.getElementById('accessibility-panel');
        if (!panel) return;

        // Actualizar checkboxes
        const checkboxes = {
            'toggle-contrast': this.settings.highContrast,
            'toggle-tts': this.settings.textToSpeech,
            'toggle-motion': this.settings.reducedMotion,
            'toggle-dyslexia-font': this.settings.dyslexiaFont,
            'toggle-reading-mask': this.settings.readingMask,
            'toggle-reading-guide': this.settings.readingGuide,
            'toggle-highlight-links': this.settings.highlightLinks,
            'toggle-simplified': this.settings.simplifiedMode,
            'toggle-hide-images': this.settings.hideImages
        };

        Object.keys(checkboxes).forEach(id => {
            const checkbox = panel.querySelector(`#${id}`);
            if (checkbox) checkbox.checked = checkboxes[id];
        });

        // Actualizar selects
        const colorblindMode = panel.querySelector('#colorblind-mode');
        if (colorblindMode) colorblindMode.value = this.settings.colorBlindMode;

        const lineSpacing = panel.querySelector('#line-spacing');
        if (lineSpacing) lineSpacing.value = this.settings.lineSpacing;

        const letterSpacing = panel.querySelector('#letter-spacing');
        if (letterSpacing) letterSpacing.value = this.settings.letterSpacing;

        const cursorSize = panel.querySelector('#cursor-size');
        if (cursorSize) cursorSize.value = this.settings.cursorSize;

        // Actualizar controles TTS
        const speechRate = panel.querySelector('#speech-rate');
        const speechRateValue = panel.querySelector('#speech-rate-value');
        if (speechRate && speechRateValue) {
            speechRate.value = this.settings.speechRate;
            speechRateValue.textContent = this.settings.speechRate.toFixed(1);
        }

        const speechVolume = panel.querySelector('#speech-volume');
        const speechVolumeValue = panel.querySelector('#speech-volume-value');
        if (speechVolume && speechVolumeValue) {
            speechVolume.value = this.settings.speechVolume;
            speechVolumeValue.textContent = Math.round(this.settings.speechVolume * 100) + '%';
        }

        this.updateFontSizeLabel();
    }

    /**
     * Actualizar etiqueta de tamaño de fuente en el panel
     */
    updateFontSizeLabel() {
        const label = document.getElementById('current-font-size');
        if (label) {
            label.textContent = this.getFontSizeLabel();
        }
    }

    /**
     * Atrapar el foco dentro de un elemento (para modales)
     */
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    /**
     * Mostrar/ocultar panel de accesibilidad
     */
    toggleAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        
        if (!panel) {
            this.createAccessibilityPanel();
            setTimeout(() => this.openAccessibilityPanel(), 10);
        } else {
            const isHidden = panel.getAttribute('aria-hidden') === 'true';
            if (isHidden) {
                this.openAccessibilityPanel();
            } else {
                this.closeAccessibilityPanel();
            }
        }
    }

    openAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        if (!panel) return;

        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('open');
        
        // Enfocar el primer elemento
        const firstButton = panel.querySelector('button, input');
        if (firstButton) {
            firstButton.focus();
        }

        this.announceToScreenReader('Panel de accesibilidad abierto');
    }

    closeAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        if (!panel) return;

        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('open');
        
        this.announceToScreenReader('Panel de accesibilidad cerrado');
    }

    /**
     * Crear botón flotante de accesibilidad
     */
    createAccessibilityButton() {
        const button = document.createElement('button');
        button.id = 'accessibility-toggle';
        button.className = 'accessibility-toggle';
        button.setAttribute('aria-label', 'Abrir opciones de accesibilidad');
        button.setAttribute('title', 'Opciones de Accesibilidad (Alt + A)');
        
        button.innerHTML = `
            <span class="material-icons">accessibility_new</span>
        `;

        button.addEventListener('click', () => this.toggleAccessibilityPanel());

        document.body.appendChild(button);
    }

    /**
     * Obtener configuraciones actuales
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * Método público para inicializar todo
     */
    static initialize() {
        const manager = new AccessibilityManager();
        manager.createAccessibilityButton();
        return manager;
    }

    /**
     * Actualizar estado de los botones en la UI
     */
    updateUIState() {
        // Actualizar botón de contraste en header
        const contrastBtn = document.getElementById('contrast-toggle');
        if (contrastBtn) {
            contrastBtn.classList.toggle('active', this.settings.highContrast);
        }

        // Actualizar indicador de tamaño de fuente
        const fontBtn = document.getElementById('font-size-toggle');
        if (fontBtn) {
            const sizeIndicators = { 
                'small': '1', 
                'normal': '2', 
                'large': '3', 
                'extra-large': '4' 
            };
            fontBtn.setAttribute('data-size', sizeIndicators[this.settings.fontSize]);
        }

        // Actualizar checkboxes en el panel si está abierto
        const contrastToggle = document.getElementById('toggle-contrast');
        if (contrastToggle) {
            contrastToggle.checked = this.settings.highContrast;
        }

        const motionToggle = document.getElementById('toggle-motion');
        if (motionToggle) {
            motionToggle.checked = this.settings.reducedMotion;
        }
    }
}

// Exportar para uso en módulos
export default AccessibilityManager;
