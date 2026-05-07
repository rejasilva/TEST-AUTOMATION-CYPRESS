class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }
  inputUsername(username) {
    cy.get('[name="username"]').type(username)
  }
  inputPassword(password) {
    cy.get('[name="password"]').type(password)
  }
  clickLogin() {
    cy.get('button[type="submit"]').click()
  }
  verifyDashboard() {
  cy.url({ timeout: 10000 }).should('include', 'dashboard')
  }
  verifyInvalidCredentials() {
    cy.contains('Invalid credentials').should('be.visible')
  }
  verifyRequired() {
    cy.contains('Required').should('be.visible')
  }
}

export default LoginPage