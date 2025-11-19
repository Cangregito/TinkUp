/**
 * VIEW - SkillView
 * Renderiza la sección de habilidades
 */

export class SkillView {
    constructor() {
        this.skillsElement = document.getElementById('skills');
    }

    /**
     * Renderiza todas las habilidades
     */
    render(skills) {
        const skillsByCategory = this.groupByCategory(skills);
        const categoriesHTML = Object.entries(skillsByCategory)
            .map(([category, categorySkills]) => this.createCategorySection(category, categorySkills))
            .join('');

        this.skillsElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">Habilidades</h2>
                <div class="skills-container">
                    ${categoriesHTML}
                </div>
            </div>
        `;
    }

    /**
     * Agrupa habilidades por categoría
     */
    groupByCategory(skills) {
        return skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
    }

    /**
     * Crea una sección de categoría
     */
    createCategorySection(category, skills) {
        const skillBars = skills.map(skill => this.createSkillBar(skill)).join('');

        return `
            <div class="skill-category">
                <h3>${category}</h3>
                <div class="skills-list">
                    ${skillBars}
                </div>
            </div>
        `;
    }

    /**
     * Crea una barra de habilidad
     */
    createSkillBar(skill) {
        return `
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
    }
}
