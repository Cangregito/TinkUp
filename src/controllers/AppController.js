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
                <h1 class="hero-title">¡Hola! Soy <span class="highlight">Tu Nombre</span></h1>
                <p class="hero-subtitle">Desarrollador Web | Creando experiencias digitales</p>
                <p class="hero-description">
                    Transformo ideas en soluciones digitales. 
                    Apasionado por el código limpio, el diseño intuitivo y el crecimiento continuo.
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">Ver Proyectos</a>
                    <a href="#about" class="btn btn-secondary">Conóceme</a>
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
                <div class="about-content">
                    <div class="about-image">
                        <img src="./public/assets/images/profile.jpg" alt="Foto de perfil">
                    </div>
                    <div class="about-text">
                        <p>
                            Soy un desarrollador apasionado por crear experiencias digitales únicas.
                            Mi enfoque combina diseño intuitivo con código limpio y eficiente.
                        </p>
                        <p>
                            Creo en el poder de la tecnología para transformar ideas en realidad.
                            Cada proyecto es una oportunidad para aprender, crecer y superar límites.
                        </p>
                        <p>
                            Mi visión: construir soluciones que no solo funcionen,
                            sino que inspiren y generen impacto positivo.
                        </p>
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
