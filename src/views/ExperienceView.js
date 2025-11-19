/**
 * VIEW - ExperienceView
 * Renderiza la sección de experiencia laboral con Material Design Cards
 */

export class ExperienceView {
    constructor() {
        this.experienceElement = document.getElementById('experience');
    }

    /**
     * Renderiza todas las experiencias
     */
    render(experiences) {
        const experienceCards = experiences.map(exp => this.createExperienceCard(exp)).join('');

        this.experienceElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Experiencia</h2>
                <p class="section-subtitle">Mi trayectoria profesional y los proyectos en los que he colaborado</p>
                <div class="experience-timeline">
                    ${experienceCards}
                </div>
            </div>
        `;
    }

    /**
     * Crea una tarjeta de experiencia - Material Design Card
     */
    createExperienceCard(experience) {
        const achievements = experience.achievements
            .map(achievement => `<li><span class="material-icons">check_circle</span>${achievement}</li>`)
            .join('');

        const technologies = experience.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        return `
            <article class="experience-card" data-id="${experience.id}">
                <div class="experience-header">
                    <div class="experience-company">
                        <div class="company-logo">
                            <img src="${experience.logo}" alt="${experience.company}">
                        </div>
                        <div class="company-info">
                            <h3>${experience.role}</h3>
                            <p class="company-name">${experience.company}</p>
                            <p class="experience-meta">
                                <span class="material-icons">calendar_today</span>
                                ${experience.period}
                                ${experience.location ? `<span class="separator">•</span><span class="material-icons">place</span>${experience.location}` : ''}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="experience-content">
                    <p class="experience-description">${experience.description}</p>
                    ${achievements ? `
                        <div class="experience-achievements">
                            <h4>Logros destacados:</h4>
                            <ul>${achievements}</ul>
                        </div>
                    ` : ''}
                    ${technologies ? `
                        <div class="experience-technologies">
                            <h4>Tecnologías:</h4>
                            <div class="technologies">
                                ${technologies}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </article>
        `;
    }

    /**
     * Muestra un mensaje si no hay experiencias
     */
    renderEmpty() {
        this.experienceElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Experiencia</h2>
                <p class="empty-message">Próximamente agregaré mi experiencia profesional aquí...</p>
            </div>
        `;
    }
}
