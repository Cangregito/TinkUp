/**
 * VIEW - ProjectView
 * Renderiza la sección de proyectos
 */

export class ProjectView {
    constructor() {
        this.projectsElement = document.getElementById('projects');
    }

    /**
     * Renderiza todos los proyectos
     */
    render(projects) {
        const projectCards = projects.map(project => this.createProjectCard(project)).join('');

        this.projectsElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Mis Proyectos</h2>
                <div class="projects-grid">
                    ${projectCards}
                </div>
            </div>
        `;
    }

    /**
     * Crea una tarjeta de proyecto
     */
    createProjectCard(project) {
        const technologies = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        return `
            <article class="project-card" data-id="${project.id}">
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technologies">
                        ${technologies}
                    </div>
                    <div class="project-links">
                        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary">Ver Demo</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub</a>` : ''}
                    </div>
                </div>
            </article>
        `;
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
