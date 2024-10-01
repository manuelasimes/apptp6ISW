describe('Mi primera prueba', () => {
    it('Carga correctamente la página de ejemplo', () => {
      cy.visit('https://employeecrudangularqa-hqeegmdfeyd5addg.canadacentral-01.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
      cy.get('h1').should('contain', 'EmployeeCrudAngular') // Verifica que el título contenga "EmployeeCrudAngular"
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.btn').click();
      cy.get('.form-control').clear('F');
      cy.get('.form-control').type('Facu Ruiz');
      cy.get('.btn').click();
      /* ==== End Cypress Studio ==== */
    })
  })