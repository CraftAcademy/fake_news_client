describe('User can view full article', () => {

  it('View available articles on landing page', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
    cy.visit('http://localhost:3001')

    cy.get('.list-top-articles a h2')
      .eq(1)
      .click()
      .url().should('include', '/v1/articles/')
      .url().should('eq', 'http://localhost:3000/v1/articles/1')
  })
})