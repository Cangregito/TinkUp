/**
 * MODEL - SkillModel
 * Maneja los datos de habilidades
 */

export class SkillModel {
    constructor() {
        this.skills = [];
    }

    /**
     * Obtiene todas las habilidades
     */
    getAll() {
        return this.skills;
    }

    /**
     * Agrupa habilidades por categoría
     */
    getByCategory() {
        return this.skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
    }

    /**
     * Agrega una nueva habilidad
     */
    add(skill) {
        const newSkill = {
            id: Date.now(),
            name: skill.name,
            category: skill.category,
            level: skill.level || 50,
            icon: skill.icon || ''
        };
        
        this.skills.push(newSkill);
        return newSkill;
    }

    /**
     * Carga habilidades iniciales (datos de ejemplo o de una persona)
     * @param {array} skillsData - Array de habilidades a cargar
     */
    loadInitialData(skillsData = []) {
        if (skillsData && skillsData.length > 0) {
            // Cargar datos de persona específica
            this.skills = skillsData.map((skill, index) => ({
                id: skill.id || index + 1,
                name: skill.name,
                category: skill.category || 'General',
                level: skill.level || 50,
                icon: skill.icon || ''
            }));
        } else {
            // Cargar datos de ejemplo por defecto
            this.skills = [
                { id: 1, name: "HTML5", category: "Frontend", level: 90, icon: "html5" },
                { id: 2, name: "CSS3", category: "Frontend", level: 85, icon: "css3" },
                { id: 3, name: "JavaScript", category: "Frontend", level: 80, icon: "js" },
                { id: 4, name: "Git", category: "Herramientas", level: 75, icon: "git" }
            ];
        }
    }
}
