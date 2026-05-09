import LoginPage from '../../pages/LoginPage'
import DirectoryPage from '../../pages/DirectoryPage'

const loginPage = new LoginPage()
const directoryPage = new DirectoryPage()

describe('Final Project OrangeHRM', () => {

  beforeEach(() => {

    cy.viewport(1366, 768)

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      timeout: 120000,
      failOnStatusCode: false
    })

  })


  // LOGIN TEST CASE
 

  it('Login berhasil dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginSuccess')

    loginPage.inputUsername('Admin')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()

    cy.wait('@loginSuccess')

    loginPage.verifyDashboard()

  })

  it('Login gagal password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongPassword')

    loginPage.inputUsername('Admin')
    loginPage.inputPassword('salah')
    loginPage.clickLogin()

    cy.wait('@wrongPassword')

    loginPage.verifyInvalidCredentials()

  })

  it('Login gagal username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongUsername')

    loginPage.inputUsername('SalahUser')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()

    cy.wait('@wrongUsername')

    loginPage.verifyInvalidCredentials()

  })

  it('Login gagal field kosong', () => {

    loginPage.clickLogin()
    loginPage.verifyRequired()

  })

  it('Login gagal password kosong', () => {

    loginPage.inputUsername('Admin')
    loginPage.clickLogin()
    loginPage.verifyRequired()

  })


  // FORGOT PASSWORD


  it('Forgot password berhasil', () => {

    cy.intercept('POST', '**/auth/requestPasswordResetCode').as('resetPassword')
    cy.contains('Forgot your password?').click()
    cy.url().should('include', 'requestPasswordResetCode')
    cy.get('[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.wait('@resetPassword')
    cy.get('h6').should('contain', 'Reset Password')

  })

  
  // DIRECTORY TEST CASE


  it('Berhasil membuka menu directory', () => {

    cy.intercept('POST', '**/auth/validate').as('directoryLogin')

    loginPage.inputUsername('Admin')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()

    cy.wait('@directoryLogin')

    directoryPage.clickDirectoryMenu()
    directoryPage.verifyDirectoryPage()

  })

  it('Berhasil search employee di directory', () => {

    cy.intercept('POST', '**/auth/validate').as('searchDirectory')

    loginPage.inputUsername('Admin')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()

    cy.wait('@searchDirectory')

    directoryPage.clickDirectoryMenu()
    directoryPage.searchEmployee('Paul')
    directoryPage.clickSearch()

  })

})