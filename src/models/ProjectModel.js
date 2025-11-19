/**
 * MODEL - ProjectModel
 * Maneja los datos de los proyectos
 */

export class ProjectModel {
    constructor() {
        this.projects = [];
    }

    /**
     * Obtiene todos los proyectos
     */
    getAll() {
        return this.projects;
    }

    /**
     * Agrega un nuevo proyecto
     */
    add(project) {
        const newProject = {
            id: Date.now(),
            title: project.title,
            description: project.description,
            technologies: project.technologies || [],
            imageUrl: project.imageUrl || '',
            demoUrl: project.demoUrl || '',
            githubUrl: project.githubUrl || '',
            createdAt: new Date()
        };
        
        this.projects.push(newProject);
        return newProject;
    }

    /**
     * Obtiene un proyecto por ID
     */
    getById(id) {
        return this.projects.find(project => project.id === id);
    }

    /**
     * Filtra proyectos por tecnología
     */
    filterByTechnology(tech) {
        return this.projects.filter(project => 
            project.technologies.includes(tech)
        );
    }

    /**
     * Carga proyectos iniciales (datos de ejemplo)
     */
    loadInitialData() {
        this.projects = [
            {
                id: 1,
                title: "Blue Hearth",
                description: "Aplicación de salud y bienestar",
                technologies: ["React", "Node.js"],
                category: "apps",
                icon: "favorite",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            },
            {
                id: 2,
                title: "Victoria Flower Shop",
                description: "E-commerce para tienda de flores",
                technologies: ["Vue.js", "MongoDB"],
                category: "ecommerce",
                icon: "local_florist",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            },
            {
                id: 3,
                title: "Digital Library",
                description: "Sistema de gestión bibliotecaria",
                technologies: ["Angular", "PostgreSQL"],
                category: "apps",
                icon: "library_books",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            },
            {
                id: 4,
                title: "Electronics",
                description: "Tienda online de electrónicos",
                technologies: ["React", "Express"],
                category: "ecommerce",
                icon: "devices",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            },
            {
                id: 5,
                title: "Autofixed",
                description: "Plataforma de servicios automotrices",
                technologies: ["Next.js", "Prisma"],
                category: "apps",
                icon: "build",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            },
            {
                id: 6,
                title: "Traveling",
                description: "App de viajes y turismo",
                technologies: ["Flutter", "Firebase"],
                category: "apps",
                icon: "flight",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            }
        ];
    }
}
