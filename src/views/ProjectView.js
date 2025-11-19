/**
 * VIEW - ProjectView
 * Renderiza la sección de proyectos
 */

export class ProjectView {
    constructor() {
        this.projectsElement = document.getElementById('projects');
    }

    /**
     * Renderiza todos los proyectos con filtros laterales
     */
    render(projects) {
        const projectCards = projects.map(project => this.createProjectCard(project)).join('');

        this.projectsElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Proyectos</h2>
                <p class="section-subtitle">Explora mi portafolio de trabajos y soluciones digitales</p>
                
                <div class="projects-layout">
                    <!-- Filtros laterales -->
                    <aside class="projects-filters">
                        <h3>Categorías</h3>
                        <ul class="filter-list">
                            <li>
                                <button class="filter-btn active" data-filter="all">
                                    Todos
                                </button>
                            </li>
                            <li>
                                <button class="filter-btn" data-filter="apps">
                                    Apps
                                </button>
                            </li>
                            <li>
                                <button class="filter-btn" data-filter="backend">
                                    Backend
                                </button>
                            </li>
                            <li>
                                <button class="filter-btn" data-filter="frontend">
                                    Frontend
                                </button>
                            </li>
                            <li>
                                <button class="filter-btn" data-filter="ecommerce">
                                    Ecommerce
                                </button>
                            </li>
                            <li>
                                <button class="filter-btn" data-filter="bigdata">
                                    Big Data
                                </button>
                            </li>
                        </ul>
                    </aside>
                    
                    <!-- Grid de proyectos -->
                    <div class="projects-content">
                        <div class="projects-grid" id="projects-grid">
                            ${projectCards}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupFilters();
    }

    /**
     * Crea una tarjeta de proyecto con logo y fondo degradado
     */
    createProjectCard(project) {
        const technologies = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const category = project.category || 'all';

        return `
            <article class="project-card" data-id="${project.id}" data-category="${category}">
                <div class="project-logo">
                    <span class="material-icons">${project.icon || 'code'}</span>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technologies">
                        ${technologies}
                    </div>
                </div>
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary">Ver Demo</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub</a>` : ''}
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * Configura los filtros de proyectos
     */
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Actualizar botón activo
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filtrar proyectos
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('show'), 10);
                    } else {
                        card.classList.remove('show');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        // Mostrar todas las cards inicialmente
        setTimeout(() => {
            projectCards.forEach(card => card.classList.add('show'));
        }, 100);
    }

    /**
     * Muestra un mensaje si no hay proyectos
     */
    renderEmpty() {
        this.projectsElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Mis Proyectos</h2>
                <p class="empty-message">Próximamente agregaré proyectos aquí...</p>
            </div>
        `;
    }
}
