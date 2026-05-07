import LoginPage from '../../pages/LoginPage'

describe('OrangeHRM Login POM', () => {
  const loginPage = new LoginPage()
  beforeEach(() => {
    loginPage.visit()
  })

  it('Login valid', () => {
    loginPage.inputUsername('Admin')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()

    loginPage.verifyDashboard()
  })

  it('Password salah', () => {
    loginPage.inputUsername('Admin')
    loginPage.inputPassword('salah')
    loginPage.clickLogin()

    loginPage.verifyInvalidCredentials()
  })

  it('Username salah', () => {
    loginPage.inputUsername('SalahUser')
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()
    loginPage.verifyInvalidCredentials()
  })

  it('Username kosong', () => {
    loginPage.inputPassword('admin123')
    loginPage.clickLogin()
    loginPage.verifyRequired()
  })

  it('Password kosong', () => {
    loginPage.inputUsername('Admin')
    loginPage.clickLogin()
    loginPage.verifyRequired()
  })
})