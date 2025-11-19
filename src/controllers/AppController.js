/**
 * CONTROLLER - AppController
 * Controlador principal que coordina Models y Views
 */

import { ProjectModel } from '../models/ProjectModel.js';
import { SkillModel } from '../models/SkillModel.js';
import { HeaderView } from '../views/HeaderView.js';
import { ProjectView } from '../views/ProjectView.js';
import { SkillView } from '../views/SkillView.js';

export class AppController {
    constructor() {
        // Inicializar Models
        this.projectModel = new ProjectModel();
        this.skillModel = new SkillModel();

        // Inicializar Views
        this.headerView = new HeaderView();
        this.projectView = new ProjectView();
        this.skillView = new SkillView();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Cargar datos iniciales
        this.loadData();

        // Renderizar vistas
        this.renderAll();

        // Configurar event listeners
        this.setupEventListeners();

        // Renderizar otras secciones
        this.renderHeroSection();
        this.renderAboutSection();
        this.renderContactSection();
        this.renderFooter();
    }

    /**
     * Carga los datos iniciales
     */
    loadData() {
        this.projectModel.loadInitialData();
        this.skillModel.loadInitialData();
    }

    /**
     * Renderiza todas las vistas
     */
    renderAll() {
        this.headerView.render();
        
        const projects = this.projectModel.getAll();
        if (projects.length > 0) {
            this.projectView.render(projects);
        } else {
            this.projectView.renderEmpty();
        }

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
     * Renderiza la sección Hero
     */
    renderHeroSection() {
        const heroElement = document.getElementById('hero');
        heroElement.innerHTML = `
            <div class="hero-content container">
                <h1 class="hero-title">¡Hola! Soy <span class="highlight">Tu Nombre</span></h1>
                <p class="hero-subtitle">Desarrollador Web | Programador</p>
                <p class="hero-description">
                    Bienvenido a mi portafolio personal donde comparto mis proyectos y habilidades.
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">Ver Proyectos</a>
                    <a href="#contact" class="btn btn-secondary">Contactar</a>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la sección Sobre Mí
     */
    renderAboutSection() {
        const aboutElement = document.getElementById('about');
        aboutElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Sobre Mí</h2>
                <div class="about-content">
                    <div class="about-image">
                        <img src="./public/assets/images/profile.jpg" alt="Foto de perfil">
                    </div>
                    <div class="about-text">
                        <p>
                            Soy un desarrollador apasionado por crear experiencias web increíbles.
                            Me encanta aprender nuevas tecnologías y resolver problemas complejos.
                        </p>
                        <p>
                            Mi objetivo es construir aplicaciones que no solo funcionen bien,
                            sino que también brinden una excelente experiencia de usuario.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la sección de Contacto
     */
    renderContactSection() {
        const contactElement = document.getElementById('contact');
        contactElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Contacto</h2>
                <div class="contact-content">
                    <form class="contact-form" id="contact-form">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Mensaje</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                    </form>
                    <div class="contact-info">
                        <h3>Información de Contacto</h3>
                        <p>📧 Email: tu-email@ejemplo.com</p>
                        <p>🔗 GitHub: github.com/Cangregito</p>
                        <p>💼 LinkedIn: linkedin.com/in/tu-perfil</p>
                    </div>
                </div>
            </div>
        `;

        this.setupContactForm();
    }

    /**
     * Renderiza el Footer
     */
    renderFooter() {
        const footerElement = document.getElementById('footer');
        footerElement.innerHTML = `
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} TinkUp. Todos los derechos reservados.</p>
                <div class="social-links">
                    <a href="https://github.com/Cangregito" target="_blank">GitHub</a>
                    <a href="#" target="_blank">LinkedIn</a>
                    <a href="#" target="_blank">Twitter</a>
                </div>
            </div>
        `;
    }

    /**
     * Configura el formulario de contacto
     */
    setupContactForm() {
        const form = document.getElementById('contact-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! (Funcionalidad en desarrollo)');
            form.reset();
        });
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
