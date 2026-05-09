class ForgotPasswordPage {

  clickForgotPassword() {
    cy.contains('Forgot your password?').click()
  }

  inputUsername(username) {
    cy.get('[name="username"]').type(username)
  }

  clickResetPassword() {
    cy.get('button[type="submit"]').click()
  }

  verifyResetSuccess() {
    cy.url().should('include', 'sendPasswordReset')
  }

}

export default ForgotPasswordPage