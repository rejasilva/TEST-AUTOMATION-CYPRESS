describe('Login OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // 1. Login berhasil
  it('Login dengan data valid', () => {
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', 'dashboard')
  })

  // 2. Password salah
  it('Login gagal - password salah', () => {
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 3. Username salah
  it('Login gagal - username salah', () => {
    cy.get('[name="username"]').type('SalahUser')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  // 4. Field kosong
  it('Login gagal - semua field kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // 5. Username kosong
  it('Login gagal - username kosong', () => {
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // 6. Password kosong
  it('Login gagal - password kosong', () => {
    cy.get('[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

})