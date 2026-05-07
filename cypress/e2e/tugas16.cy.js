describe('Login OrangeHRM dengan Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('Login dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')

    cy.url().should('include', 'dashboard')
  })

})