describe('Pruebas de validación para límite de 100 caracteres en el nombre', () => {
    it('Carga correctamente la página de ejemplo', () => {
        // Visita la URL de tu aplicación
        cy.visit('http://localhost:4200/');
    });

    it('Muestra un error si el nombre tiene más de 100 caracteres', () => {
        // Visita la página con el formulario
        cy.visit('http://localhost:4200/');

        // Crea un nombre de más de 100 caracteres
        const longName = 'a'.repeat(101); 

        // Selecciona el campo del nombre y escribe el nombre largo
        cy.get('input[name="name"]').type(longName);

        // Envía el formulario
        cy.get('button[type="submit"]').click();

        // Verifica que se muestra el mensaje de error correspondiente
        cy.get('.error-message') 
          .should('contain', 'El nombre no puede tener más de 100 caracteres');
    });
});
