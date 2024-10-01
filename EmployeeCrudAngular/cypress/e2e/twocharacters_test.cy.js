describe('Pruebas de validación de nombre con menos de dos caracteres', () => {
    it('Carga correctamente la página de ejemplo', () => {
        // Visita la URL de tu aplicación
        cy.visit('http://localhost:4200/');
    });

    it('Muestra un error si el nombre tiene menos de dos caracteres', () => {
        // Visita la página con el formulario
        cy.visit('http://localhost:4200/');

        // Selecciona el campo del nombre y escribe un nombre con menos de dos caracteres
        cy.get('input[name="name"]').type('J');

        // Envía el formulario
        cy.get('button[type="submit"]').click();

        // Verifica que se muestra el mensaje de error correspondiente
        cy.get('.error-message') 
          .should('contain', 'El nombre debe tener al menos 2 caracteres');
    });
});
