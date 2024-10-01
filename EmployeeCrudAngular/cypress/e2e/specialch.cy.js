describe('Pruebas de validación para caracteres especiales en el nombre', () => {
    it('Carga correctamente la página de ejemplo', () => {
        // Visita la URL de tu aplicación
        cy.visit('http://localhost:4200/');
    });

    it('Muestra un error si el nombre contiene caracteres especiales', () => {
        // Visita la página con el formulario
        cy.visit('http://localhost:4200/');

        cy.get('input[name="name"]').type('@Juan!');

        // Envía el formulario
        cy.get('button[type="submit"]').click();

        cy.get('.error-message') 
          .should('contain', 'El nombre no puede contener caracteres especiales');
    });
});
