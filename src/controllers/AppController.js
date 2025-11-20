/**
 * CONTROLLER - AppController
 * Controlador principal que coordina Models y Views
 */

import { ProjectModel } from '../models/ProjectModel.js';
import { SkillModel } from '../models/SkillModel.js';
import { ExperienceModel } from '../models/ExperienceModel.js';
import { PersonModel } from '../models/PersonModel.js';
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
        this.personModel = PersonModel;

        // Inicializar Views
        this.headerView = new HeaderView();
        this.projectView = new ProjectView();
        this.skillView = new SkillView();
        this.experienceView = new ExperienceView();

        // Persona actual
        this.currentPersonId = localStorage.getItem('selectedPerson') || 'jassiel';
        this.currentPersonData = null;
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        try {
            // Cargar datos de la persona actual
            this.loadPersonData(this.currentPersonId);

            // Renderizar vistas en orden: A.INICIO, B.PROYECTOS, C.EXPERIENCIA, D.HABILIDADES, E.ACERCA DE
            const persons = this.personModel.getAllPersons();
            this.headerView.render(persons);
            this.renderHeroSection();      // A. INICIO
            this.renderProjects();          // B. PROYECTOS
            this.renderExperience();        // C. EXPERIENCIA
            this.renderSkills();            // D. HABILIDADES
            this.renderAboutSection();      // E. ACERCA DE
            this.renderFooter();

            // Configurar event listeners
            this.setupEventListeners();
            
            console.log('✅ Aplicación inicializada correctamente');
            console.log('👤 Persona actual:', this.currentPersonData?.name);
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            // Intentar cargar con datos por defecto
            this.loadFallbackData();
        }
    }

    /**
     * Carga los datos de una persona específica
     * @param {string} personId - ID de la persona
     */
    loadPersonData(personId) {
        try {
            this.currentPersonId = personId;
            this.currentPersonData = this.personModel.getPersonData(personId);
            
            if (!this.currentPersonData) {
                console.warn('⚠️ No se encontraron datos para:', personId);
                // Cargar primera persona disponible
                const persons = this.personModel.getAllPersons();
                if (persons.length > 0) {
                    this.currentPersonId = persons[0].id;
                    this.currentPersonData = this.personModel.getPersonData(this.currentPersonId);
                }
            }
            
            // Cargar datos de la persona en los modelos
            this.loadData();
        } catch (error) {
            console.error('❌ Error al cargar datos de persona:', error);
            this.loadFallbackData();
        }
    }

    /**
     * Carga datos de respaldo en caso de error
     */
    loadFallbackData() {
        console.log('📦 Cargando datos de respaldo...');
        this.projectModel.loadInitialData();
        this.skillModel.loadInitialData();
        this.experienceModel.loadInitialData();
    }

    /**
     * Carga los datos iniciales de la persona actual
     */
    loadData() {
        if (!this.currentPersonData) return;

        // Cargar proyectos de la persona
        this.projectModel.loadInitialData(this.currentPersonData.projects || []);
        
        // Cargar habilidades de la persona
        this.skillModel.loadInitialData(this.currentPersonData.skills || []);
        
        // Cargar experiencia de la persona
        this.experienceModel.loadInitialData(this.currentPersonData.experience || []);
    }

    /**
     * Recarga todo el contenido con la nueva persona
     */
    reloadAllContent() {
        console.log('🔄 Recargando contenido para:', this.currentPersonData?.name);
        
        // Re-renderizar header con nueva persona seleccionada
        const persons = this.personModel.getAllPersons();
        this.headerView.currentPersonId = this.currentPersonId;
        this.headerView.render(persons);
        
        // Re-renderizar todas las secciones
        this.renderHeroSection();
        this.renderProjects();
        this.renderExperience();
        this.renderSkills();
        this.renderAboutSection();
        
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('✅ Contenido recargado');
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
        // Listener para cambio de persona
        window.addEventListener('personChanged', (e) => {
            console.log('📨 Evento personChanged recibido:', e.detail);
            const { personId } = e.detail;
            this.loadPersonData(personId);
            this.reloadAllContent();
            
            // Notificación visual
            this.showNotification(`Mostrando CV de: ${this.currentPersonData.name}`);
        });
        
        console.log('✅ Event listeners configurados');
    }

    /**
     * Muestra notificación temporal
     * @param {string} message - Mensaje a mostrar
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'person-change-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    /**
     * A. INICIO - Renderiza la sección Hero
     * Tono: Inspirador, Profesional, Cálido, Confidente
     */
    renderHeroSection() {
        const heroElement = document.getElementById('hero');
        
        if (!heroElement) {
            console.error('❌ Elemento #hero no encontrado');
            return;
        }
        
        // Usar datos por defecto si no hay currentPersonData
        const name = this.currentPersonData?.name || 'Desarrollador';
        const role = this.currentPersonData?.role || 'Full Stack Developer';
        const bio = this.currentPersonData?.bio || 'Desarrollador apasionado por crear experiencias digitales únicas.';
        
        heroElement.innerHTML = `
            <div class="hero-content container">
                <div class="hero-profile">
                    <div class="profile-decoration left">
                        <span class="material-icons">arrow_back</span>
                    </div>
                    <div class="profile-info">
                        <h1 class="hero-title">${name}</h1>
                        <p class="hero-role">${role}</p>
                        <p class="hero-description">${bio}</p>
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
        
        if (!aboutElement) {
            console.error('❌ Elemento #about no encontrado');
            return;
        }
        
        // Usar datos por defecto si no hay currentPersonData
        const name = this.currentPersonData?.name || 'Desarrollador';
        const email = this.currentPersonData?.email || 'email@example.com';
        const phone = this.currentPersonData?.phone || '+52 123 456 7890';
        const location = this.currentPersonData?.location || 'México';
        const social = this.currentPersonData?.social || {};
        
        aboutElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Acerca de Mí</h2>
                <p class="section-subtitle">Conoce más sobre mis pasiones, intereses y lo que me inspira</p>
                
                <div class="about-blocks">
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">person</span>
                            <h3>Información Personal</h3>
                        </div>
                        <ul class="about-list">
                            <li><strong>Nombre:</strong> ${name}</li>
                            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                            <li><strong>Teléfono:</strong> ${phone}</li>
                            <li><strong>Ubicación:</strong> ${location}</li>
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">link</span>
                            <h3>Redes Sociales</h3>
                        </div>
                        <ul class="about-list social-links">
                            ${social.github ? `<li><a href="${social.github}" target="_blank" rel="noopener noreferrer">
                                <span class="material-icons">code</span> GitHub
                            </a></li>` : ''}
                            ${social.linkedin ? `<li><a href="${social.linkedin}" target="_blank" rel="noopener noreferrer">
                                <span class="material-icons">work</span> LinkedIn
                            </a></li>` : ''}
                            ${social.twitter ? `<li><a href="${social.twitter}" target="_blank" rel="noopener noreferrer">
                                <span class="material-icons">chat</span> Twitter
                            </a></li>` : ''}
                            ${social.portfolio ? `<li><a href="${social.portfolio}" target="_blank" rel="noopener noreferrer">
                                <span class="material-icons">language</span> Portfolio
                            </a></li>` : ''}
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <div class="about-card-header">
                            <span class="material-icons">favorite</span>
                            <h3>Sobre Mí</h3>
                        </div>
                        <ul class="about-list">
                            <li>Apasionado por crear soluciones tecnológicas innovadoras</li>
                            <li>Siempre aprendiendo nuevas tecnologías y metodologías</li>
                            <li>Enfocado en la experiencia del usuario y accesibilidad</li>
                            <li>Colaborador activo en proyectos de código abierto</li>
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
