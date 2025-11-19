/**
 * CONTROLLER - AppController
 * Controlador principal que coordina Models y Views
 */

import { ProjectModel } from '../models/ProjectModel.js';
import { SkillModel } from '../models/SkillModel.js';
import { ExperienceModel } from '../models/ExperienceModel.js';
import { HeaderView } from '../views/HeaderView.js';
import { ProjectView } from '../views/ProjectView.js';
import { SkillView } from '../views/SkillView.js';
import { ExperienceView } from '../views/ExperienceView.js';

export class AppController {
    constructor() {
        // Inicializar Models
        this.projectModel = new ProjectModel();
        this.skillModel = new SkillModel();
        this.experienceModel = new ExperienceModel();

        // Inicializar Views
        this.headerView = new HeaderView();
        this.projectView = new ProjectView();
        this.skillView = new SkillView();
        this.experienceView = new ExperienceView();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Cargar datos iniciales
        this.loadData();

        // Renderizar vistas en orden: A.INICIO, B.PROYECTOS, C.EXPERIENCIA, D.HABILIDADES, E.ACERCA DE
        this.headerView.render();
        this.renderHeroSection();      // A. INICIO
        this.renderProjects();          // B. PROYECTOS
        this.renderExperience();        // C. EXPERIENCIA
        this.renderSkills();            // D. HABILIDADES
        this.renderAboutSection();      // E. ACERCA DE
        this.renderFooter();

        // Configurar event listeners
        this.setupEventListeners();
    }

    /**
     * Carga los datos iniciales
     */
    loadData() {
        this.projectModel.loadInitialData();
        this.skillModel.loadInitialData();
        this.experienceModel.loadInitialData();
    }

    /**
     * Renderiza todas las vistas
     */
    renderAll() {
        this.renderProjects();
        this.renderExperience();
        this.renderSkills();
    }

    /**
     * Renderiza la sección de proyectos
     */
    renderProjects() {
        const projects = this.projectModel.getAll();
        if (projects.length > 0) {
            this.projectView.render(projects);
        } else {
            this.projectView.renderEmpty();
        }
    }

    /**
     * Renderiza la sección de experiencia
     */
    renderExperience() {
        const experiences = this.experienceModel.sortByDate();
        if (experiences.length > 0) {
            this.experienceView.render(experiences);
        } else {
            this.experienceView.renderEmpty();
        }
    }

    /**
     * Renderiza la sección de habilidades
     */
    renderSkills() {
        const skills = this.skillModel.getAll();
        this.skillView.render(skills);
    }

    /**
     * Configura event listeners globales
     */
    setupEventListeners() {
        // Aquí puedes agregar listeners para interacciones del usuario
        console.log('Event listeners configurados');
    }

    /**
     * A. INICIO - Renderiza la sección Hero
     * Tono: Inspirador, Profesional, Cálido, Confidente
     */
    renderHeroSection() {
        const heroElement = document.getElementById('hero');
        heroElement.innerHTML = `
            <div class="hero-content container">
                <div class="hero-profile">
                    <div class="profile-decoration left">
                        <span class="material-icons">arrow_back</span>
                    </div>
                    <div class="profile-info">
                        <h1 class="hero-title">Erick De Santiago</h1>
                        <p class="hero-description">
                            Desarrollador apasionado por crear experiencias digitales únicas.
                            Mi enfoque combina diseño intuitivo con código limpio y eficiente,
                            transformando ideas en soluciones innovadoras.
                        </p>
                    </div>
                    <div class="profile-decoration right">
                        <span class="material-icons">arrow_forward</span>
                    </div>
                </div>
                
                <div class="hero-cards">
                    <a href="#projects" class="hero-card">
                        <span class="material-icons card-icon">work</span>
                        <h3>Proyectos</h3>
                        <p>Explora mi portafolio de trabajos</p>
                    </a>
                    <a href="#experience" class="hero-card">
                        <span class="material-icons card-icon">business_center</span>
                        <h3>Experiencia</h3>
                        <p>Conoce mi trayectoria profesional</p>
                    </a>
                    <a href="#skills" class="hero-card">
                        <span class="material-icons card-icon">code</span>
                        <h3>Habilidades</h3>
                        <p>Descubre mis competencias técnicas</p>
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * E. ACERCA DE - Renderiza la sección Sobre Mí
     * Tono: Creativo, Colaborativo, Claro, Motivador
     */
    renderAboutSection() {
        const aboutElement = document.getElementById('about');
        aboutElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Acerca de Mí</h2>
                <p class="section-subtitle">Conoce más sobre mis pasiones, intereses y lo que me inspira</p>
                
                <div class="about-blocks">
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">favorite</span>
                            <h3>Pasiones</h3>
                        </div>
                        <ul class="about-list">
                            <li>Crear soluciones tecnológicas que impacten positivamente en la vida de las personas</li>
                            <li>Aprender constantemente nuevas tecnologías y metodologías de desarrollo</li>
                            <li>Colaborar en proyectos de código abierto y contribuir a la comunidad</li>
                            <li>Diseñar interfaces intuitivas que mejoren la experiencia del usuario</li>
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">music_note</span>
                            <h3>Música</h3>
                        </div>
                        <ul class="about-list">
                            <li>La música electrónica me ayuda a concentrarme durante largas sesiones de código</li>
                            <li>Disfruto del jazz mientras diseño interfaces y planifico arquitecturas</li>
                            <li>El rock clásico es mi compañero en sesiones de debugging intensivas</li>
                            <li>Descubrir nuevos artistas y géneros musicales constantemente</li>
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">interests</span>
                            <h3>Hobbies</h3>
                        </div>
                        <ul class="about-list">
                            <li>Fotografía digital y edición de imágenes en mis tiempos libres</li>
                            <li>Practicar senderismo y explorar nuevos lugares naturales</li>
                            <li>Leer sobre filosofía, ciencia ficción y desarrollo personal</li>
                            <li>Experimentar con nuevas recetas de cocina internacional</li>
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">lightbulb</span>
                            <h3>Intereses</h3>
                        </div>
                        <ul class="about-list">
                            <li>Inteligencia artificial y machine learning aplicado al desarrollo web</li>
                            <li>Arquitecturas de software escalables y patrones de diseño</li>
                            <li>Metodologías ágiles y mejores prácticas de desarrollo en equipo</li>
                            <li>Accesibilidad web y diseño inclusivo para todos los usuarios</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza el Footer
     */
    renderFooter() {
        const footerElement = document.getElementById('footer');
        footerElement.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-info">
                        <h3>ThinkUp</h3>
                        <p>Transformando ideas en experiencias digitales</p>
                    </div>
                    <div class="footer-links">
                        <h4>Contacto</h4>
                        <p>📧 tu-email@ejemplo.com</p>
                        <p>🔗 github.com/Cangregito</p>
                        <p>💼 linkedin.com/in/tu-perfil</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} ThinkUp. Hecho con ❤️ y mucho café ☕</p>
                    <div class="social-links">
                        <a href="https://github.com/Cangregito" target="_blank" aria-label="GitHub">
                            <span class="material-icons">code</span>
                        </a>
                        <a href="#" target="_blank" aria-label="LinkedIn">
                            <span class="material-icons">work</span>
                        </a>
                        <a href="#" target="_blank" aria-label="Twitter">
                            <span class="material-icons">alternate_email</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Agrega un nuevo proyecto
     */
    addProject(projectData) {
        const project = this.projectModel.add(projectData);
        this.renderAll();
        return project;
    }

    /**
     * Agrega una nueva habilidad
     */
    addSkill(skillData) {
        const skill = this.skillModel.add(skillData);
        this.renderAll();
        return skill;
    }
}
