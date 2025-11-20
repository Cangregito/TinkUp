/**
 * Punto de entrada de la aplicación
 */

import { AppController } from '../../src/controllers/AppController.js';
import AccessibilityManager from '../../src/utils/AccessibilityManager.js';

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gestor de accesibilidad
    const accessibilityManager = AccessibilityManager.initialize();
    
    // Inicializar la aplicación principal
    const app = new AppController();
    app.init();
    
    // Hacer el gestor de accesibilidad disponible globalmente
    window.accessibilityManager = accessibilityManager;
    
    console.log('✅ ThinkUp Portfolio cargado correctamente');
    console.log('♿ Sistema de accesibilidad activo');
});
