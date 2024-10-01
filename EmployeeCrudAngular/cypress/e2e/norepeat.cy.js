describe('Pruebas de validación para nombres repetidos', () => {
    it('Carga correctamente la página de ejemplo', () => {
        // Visita la URL de tu aplicación
        cy.visit('http://localhost:4200/');
    });

    it('Muestra un error si el nombre ya existe', () => {
        // Visita la página con el formulario
        cy.visit('http://localhost:4200/');

        
        const existingName = 'Manuela'; 
        cy.get('input[name="name"]').type(existingName);

        // Envía el formulario
        cy.get('button[type="submit"]').click();

        // Verifica que se muestra el mensaje de error correspondiente
        cy.get('.error-message') 
          .should('contain', 'El nombre ya existe');
    });
});
