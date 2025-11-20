/**
 * PersonModel.js
 * Modelo de datos para múltiples personas (CVs)
 */

export const PersonModel = {
    persons: {
        jassiel: {
            id: 'jassiel',
            name: 'Jassiel García',
            role: 'Full Stack Developer',
            bio: 'Desarrollador apasionado por crear soluciones innovadoras y accesibles.',
            email: 'jassiel@example.com',
            phone: '+52 123 456 7890',
            location: 'México',
            avatar: './public/assets/images/jassiel-avatar.jpg',
            social: {
                github: 'https://github.com/Cangregito',
                linkedin: 'https://linkedin.com/in/jassiel',
                twitter: 'https://twitter.com/jassiel',
                portfolio: 'https://jassiel.dev'
            },
            skills: [
                { name: 'JavaScript', level: 90, category: 'frontend' },
                { name: 'React', level: 85, category: 'frontend' },
                { name: 'Node.js', level: 80, category: 'backend' },
                { name: 'Python', level: 75, category: 'backend' },
                { name: 'SQL', level: 70, category: 'database' },
                { name: 'Git', level: 85, category: 'tools' }
            ],
            projects: [
                {
                    id: 1,
                    title: 'ThinkUp Portfolio',
                    description: 'Portafolio personal con accesibilidad AAA',
                    image: './public/assets/images/project-1.jpg',
                    technologies: ['HTML', 'CSS', 'JavaScript', 'Accesibilidad'],
                    link: 'https://github.com/Cangregito/TinkUp',
                    demo: 'https://thinkup-demo.vercel.app'
                },
                {
                    id: 2,
                    title: 'E-commerce Platform',
                    description: 'Plataforma de comercio electrónico con carrito de compras',
                    image: './public/assets/images/project-2.jpg',
                    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    link: 'https://github.com/user/ecommerce',
                    demo: 'https://ecommerce-demo.vercel.app'
                }
            ],
            experience: [
                {
                    id: 1,
                    company: 'Tech Company',
                    position: 'Full Stack Developer',
                    startDate: '2023-01',
                    endDate: 'Presente',
                    description: 'Desarrollo de aplicaciones web con React y Node.js',
                    achievements: [
                        'Implementé sistema de accesibilidad AAA',
                        'Reduje tiempo de carga en 40%',
                        'Lideré equipo de 3 desarrolladores'
                    ]
                },
                {
                    id: 2,
                    company: 'Startup XYZ',
                    position: 'Frontend Developer',
                    startDate: '2022-06',
                    endDate: '2022-12',
                    description: 'Desarrollo de interfaces de usuario modernas',
                    achievements: [
                        'Creé biblioteca de componentes reutilizables',
                        'Implementé diseño responsive'
                    ]
                }
            ]
        },

        erick: {
            id: 'erick',
            name: 'Erick De Santiago',
            role: 'Backend Developer',
            bio: 'Especialista en desarrollo backend y arquitectura de sistemas escalables.',
            email: 'erick@example.com',
            phone: '+52 123 456 7891',
            location: 'México',
            avatar: './public/assets/images/erick-avatar.jpg',
            social: {
                github: 'https://github.com/erickdesantiago',
                linkedin: 'https://linkedin.com/in/erickdesantiago',
                twitter: 'https://twitter.com/erickdev',
                portfolio: 'https://erick.dev'
            },
            skills: [
                { name: 'Python', level: 95, category: 'backend' },
                { name: 'Django', level: 90, category: 'backend' },
                { name: 'PostgreSQL', level: 85, category: 'database' },
                { name: 'Docker', level: 80, category: 'tools' },
                { name: 'AWS', level: 75, category: 'cloud' },
                { name: 'REST APIs', level: 90, category: 'backend' }
            ],
            projects: [
                {
                    id: 1,
                    title: 'API Gateway',
                    description: 'Sistema de gateway para microservicios',
                    image: './public/assets/images/project-3.jpg',
                    technologies: ['Python', 'FastAPI', 'Redis', 'Docker'],
                    link: 'https://github.com/user/api-gateway',
                    demo: 'https://api-gateway-demo.com'
                },
                {
                    id: 2,
                    title: 'Task Management System',
                    description: 'Sistema de gestión de tareas con notificaciones en tiempo real',
                    image: './public/assets/images/project-4.jpg',
                    technologies: ['Django', 'WebSockets', 'Celery', 'PostgreSQL'],
                    link: 'https://github.com/user/task-manager',
                    demo: 'https://tasks-demo.com'
                }
            ],
            experience: [
                {
                    id: 1,
                    company: 'Enterprise Corp',
                    position: 'Senior Backend Developer',
                    startDate: '2022-03',
                    endDate: 'Presente',
                    description: 'Desarrollo de arquitectura backend escalable',
                    achievements: [
                        'Diseñé arquitectura de microservicios',
                        'Optimicé consultas SQL en 60%',
                        'Implementé CI/CD con Docker y Kubernetes'
                    ]
                }
            ]
        },

        ari: {
            id: 'ari',
            name: 'Ari Arroyo',
            role: 'UI/UX Designer & Frontend Developer',
            bio: 'Diseñadora enfocada en crear experiencias de usuario excepcionales.',
            email: 'ari@example.com',
            phone: '+52 123 456 7892',
            location: 'México',
            avatar: './public/assets/images/ari-avatar.jpg',
            social: {
                github: 'https://github.com/ariarroyo',
                linkedin: 'https://linkedin.com/in/ariarroyo',
                twitter: 'https://twitter.com/aridesign',
                portfolio: 'https://ari.design'
            },
            skills: [
                { name: 'Figma', level: 95, category: 'design' },
                { name: 'Adobe XD', level: 90, category: 'design' },
                { name: 'CSS', level: 90, category: 'frontend' },
                { name: 'HTML', level: 85, category: 'frontend' },
                { name: 'JavaScript', level: 75, category: 'frontend' },
                { name: 'UI/UX', level: 95, category: 'design' }
            ],
            projects: [
                {
                    id: 1,
                    title: 'Design System',
                    description: 'Sistema de diseño completo para aplicaciones web',
                    image: './public/assets/images/project-5.jpg',
                    technologies: ['Figma', 'CSS', 'Storybook', 'React'],
                    link: 'https://github.com/user/design-system',
                    demo: 'https://design-system-demo.com'
                },
                {
                    id: 2,
                    title: 'Mobile App Redesign',
                    description: 'Rediseño completo de aplicación móvil bancaria',
                    image: './public/assets/images/project-6.jpg',
                    technologies: ['Figma', 'Prototyping', 'User Research'],
                    link: 'https://behance.net/user/mobile-redesign',
                    demo: 'https://mobile-demo.com'
                }
            ],
            experience: [
                {
                    id: 1,
                    company: 'Design Studio',
                    position: 'Lead UI/UX Designer',
                    startDate: '2021-08',
                    endDate: 'Presente',
                    description: 'Liderazgo de proyectos de diseño de experiencia de usuario',
                    achievements: [
                        'Creé design system usado por 50+ desarrolladores',
                        'Aumenté conversión de usuarios en 35%',
                        'Lideré investigación de usuarios con +200 participantes'
                    ]
                },
                {
                    id: 2,
                    company: 'Creative Agency',
                    position: 'UI Designer',
                    startDate: '2020-01',
                    endDate: '2021-07',
                    description: 'Diseño de interfaces para clientes corporativos',
                    achievements: [
                        'Diseñé +30 interfaces web',
                        'Implementé accesibilidad WCAG AA en todos los proyectos'
                    ]
                }
            ]
        }
    },

    /**
     * Obtiene los datos de una persona por ID
     * @param {string} personId - ID de la persona (jassiel, erick, ari)
     * @returns {object} Datos de la persona
     */
    getPersonData(personId) {
        return this.persons[personId] || this.persons.jassiel;
    },

    /**
     * Obtiene lista de todas las personas
     * @returns {array} Array con información básica de todas las personas
     */
    getAllPersons() {
        return Object.values(this.persons).map(person => ({
            id: person.id,
            name: person.name,
            role: person.role,
            avatar: person.avatar
        }));
    }
};
