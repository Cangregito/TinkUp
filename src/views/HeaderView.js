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
                        <h1>TinkUp</h1>
                    </div>
                    <ul class="nav-menu" id="nav-menu">
                        <li><a href="#hero" class="nav-link">Inicio</a></li>
                        <li><a href="#about" class="nav-link">Sobre Mí</a></li>
                        <li><a href="#projects" class="nav-link">Proyectos</a></li>
                        <li><a href="#skills" class="nav-link">Habilidades</a></li>
                        <li><a href="#contact" class="nav-link">Contacto</a></li>
                    </ul>
                    <button class="hamburger" id="hamburger">
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
        const navMenu = document.getElementById('nav-menu');

        hamburger?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
            hamburger?.classList.toggle('active');
        });

        // Smooth scroll
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
                navMenu?.classList.remove('active');
                hamburger?.classList.remove('active');
            });
        });
    }
}
