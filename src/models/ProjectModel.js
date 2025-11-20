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
            id: project.id || Date.now(),
            title: project.title,
            description: project.description,
            technologies: project.technologies || [],
            image: project.image || project.imageUrl || '',
            link: project.link || project.githubUrl || '',
            demo: project.demo || project.demoUrl || '',
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
     * Carga proyectos iniciales (datos de ejemplo o de una persona)
     * @param {array} projectsData - Array de proyectos a cargar
     */
    loadInitialData(projectsData = []) {
        if (projectsData && projectsData.length > 0) {
            // Cargar datos de persona específica
            this.projects = projectsData.map(project => ({
                ...project,
                createdAt: new Date()
            }));
        } else {
            // Cargar datos de ejemplo por defecto
            this.projects = [
                {
                    id: 1,
                    title: "Blue Hearth",
                    description: "Aplicación de salud y bienestar",
                    technologies: ["React", "Node.js"],
                    category: "apps",
                    icon: "favorite",
                    demo: "#",
                    link: "https://github.com/Cangregito",
                    image: "./public/assets/images/project-1.jpg",
                    createdAt: new Date()
                },
                {
                    id: 2,
                    title: "Victoria Flower Shop",
                    description: "E-commerce para tienda de flores",
                    technologies: ["Vue.js", "MongoDB"],
                    category: "ecommerce",
                    icon: "local_florist",
                    demo: "#",
                    link: "https://github.com/Cangregito",
                    image: "./public/assets/images/project-2.jpg",
                    createdAt: new Date()
                }
            ];
        }
    }
}
