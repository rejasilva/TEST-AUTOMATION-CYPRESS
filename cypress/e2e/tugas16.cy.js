describe('Login OrangeHRM dengan Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // 1. Login berhasil
  it('Login dengan data valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginSuccess')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginSuccess')

    cy.url().should('include', 'dashboard')
  })

  // 2. Password salah
  it('Login gagal - password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongPassword')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPassword')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 3. Username salah
  it('Login gagal - username salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongUsername')

    cy.get('[name="username"]').type('SalahUser')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUsername')

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 4. Semua field kosong
  it('Login gagal - semua field kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyField')

    cy.get('button[type="submit"]').click()

    cy.wait('@emptyField')

    cy.contains('Required').should('be.visible')
  })

  // 5. Username kosong
  it('Login gagal - username kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyUsername')

    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@emptyUsername')

    cy.contains('Required').should('be.visible')
  })

  // 6. Password kosong
  it('Login gagal - password kosong', () => {

    cy.intercept('GET', '**/auth/login').as('emptyPassword')

    cy.get('[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.wait('@emptyPassword')

    cy.contains('Required').should('be.visible')
  })

})