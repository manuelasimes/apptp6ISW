describe('Mi primera prueba', () => {
    it('Carga correctamente la página de ejemplo', () => {
      cy.visit('https://employeecrudangularqa-hqeegmdfeyd5addg.canadacentral-01.azurewebsites.net/') // Colocar la url local o de Azure de nuestro front
      cy.get('h1').should('contain', 'EmployeeCrudAngular') // Verifica que el título contenga "EmployeeCrudAngular"
    })
  })