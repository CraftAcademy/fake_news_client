describe('User can view listed articles', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/article_data',
      response: 'fixture:list_articles.json'
    })
  })

  it('View available articles on landing page', () => {
    cy.get(h1)
    .should('contain', 'Fake News')
    .get('div[class="list-top-articles"]')
    .should('contain', 'Which drugs can kill you?')
    .should('contain', 'Can soccer make you fat?')
    .should('contain', '5 ways to get lost in the forest')
  })
})