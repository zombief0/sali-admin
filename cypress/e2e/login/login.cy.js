describe('Login from admin page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('should contain header', () => {
    cy.get('h1').contains('Administration SALI')
  })

  it('fills the login info and validates', () => {
    cy.get('form').within(() => {
      cy.get('input[formControlName=username]').type('admin')
      cy.get('input[formControlName=password]').type('1234')
      cy.get('button').click();
    })

    cy.url().should('include', 'commande')
    cy.get('nz-breadcrumb').children().should('contain', 'Liste des commandes')
  })
})
