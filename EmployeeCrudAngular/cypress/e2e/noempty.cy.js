describe('Pruebas de validación para nombre no vacío', () => {
    it('Carga correctamente la página de ejemplo', () => {
        // Visita la URL de tu aplicación
        cy.visit('http://localhost:4200/');
    });

    it('Muestra un error si el campo del nombre está vacío', () => {
        // Visita la página con el formulario
        cy.visit('http://localhost:4200/');

        // Deja el campo del nombre vacío y envía el formulario
        cy.get('input[name="name"]').clear(); // Asegúrate de que el selector sea correcto
        
        // Envía el formulario
        cy.get('button[type="submit"]').click();

        // Verifica que se muestra el mensaje de error correspondiente
        cy.get('.error-message') // Asegúrate de que '.error-message' sea el selector correcto para los mensajes de error en tu aplicación.
          .should('contain', 'El nombre no puede estar vacío');
    });
});
