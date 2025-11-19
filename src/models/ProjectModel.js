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
                title: "Proyecto de Ejemplo 1",
                description: "Descripción del proyecto",
                technologies: ["HTML", "CSS", "JavaScript"],
                imageUrl: "./public/assets/images/project1.jpg",
                demoUrl: "#",
                githubUrl: "https://github.com/Cangregito",
                createdAt: new Date()
            }
        ];
    }
}
