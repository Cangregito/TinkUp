/**
 * Punto de entrada de la aplicación
 */

import { AppController } from '../../src/controllers/AppController.js';

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.init();
    
    console.log('✅ TinkUp Portfolio cargado correctamente');
});
