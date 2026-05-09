class DirectoryPage {

  clickDirectoryMenu() {
    cy.contains('Directory').click()
  }
  verifyDirectoryPage() {
    cy.url().should('include', 'directory')
  }
  searchEmployee(name) {
    cy.get('input[placeholder="Type for hints..."]').type(name)
  }
  clickSearch() {
    cy.contains('Search').click()
  }

}

export default DirectoryPage