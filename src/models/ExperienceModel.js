/**
 * MODEL - ExperienceModel
 * Maneja los datos de experiencia laboral
 */

export class ExperienceModel {
    constructor() {
        this.experiences = [];
    }

    /**
     * Obtiene todas las experiencias
     */
    getAll() {
        return this.experiences;
    }

    /**
     * Agrega una nueva experiencia
     */
    add(experience) {
        const newExperience = {
            id: Date.now(),
            company: experience.company,
            role: experience.role,
            period: experience.period,
            startDate: experience.startDate,
            endDate: experience.endDate || 'Presente',
            description: experience.description || '',
            achievements: experience.achievements || [],
            technologies: experience.technologies || [],
            logo: experience.logo || '',
            location: experience.location || ''
        };
        
        this.experiences.push(newExperience);
        return newExperience;
    }

    /**
     * Obtiene experiencia por ID
     */
    getById(id) {
        return this.experiences.find(exp => exp.id === id);
    }

    /**
     * Ordena por fecha (más reciente primero)
     */
    sortByDate() {
        return [...this.experiences].sort((a, b) => {
            if (a.endDate === 'Presente') return -1;
            if (b.endDate === 'Presente') return 1;
            return new Date(b.endDate) - new Date(a.endDate);
        });
    }

    /**
     * Carga experiencias iniciales (datos de ejemplo)
     */
    loadInitialData() {
        this.experiences = [
            {
                id: 1,
                company: "Empresa Ejemplo S.A.",
                role: "Desarrollador Full Stack",
                period: "2023 - Presente",
                startDate: "2023-01",
                endDate: "Presente",
                description: "Desarrollo de aplicaciones web modernas con tecnologías de vanguardia.",
                achievements: [
                    "Implementación de arquitectura MVC",
                    "Optimización de rendimiento en un 40%",
                    "Liderazgo de equipo de 3 desarrolladores"
                ],
                technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
                logo: "./public/assets/images/company1.jpg",
                location: "Remoto"
            },
            {
                id: 2,
                company: "StartUp Tech",
                role: "Desarrollador Frontend",
                period: "2021 - 2023",
                startDate: "2021-06",
                endDate: "2023-01",
                description: "Creación de interfaces de usuario modernas y responsivas.",
                achievements: [
                    "Desarrollo de sistema de diseño completo",
                    "Implementación de PWA",
                    "Reducción de tiempo de carga en 60%"
                ],
                technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js"],
                logo: "./public/assets/images/company2.jpg",
                location: "Ciudad de México"
            }
        ];
    }
}
