
describe('GET /index.html', () => {
  it('can be accessed', () => {
    cy.visit('http://localhost:3000')
    cy.get('h1')
      .should('contain', 'First scaffold')
  })
});