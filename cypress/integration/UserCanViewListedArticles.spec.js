describe('User can view listed articles', () => {

  it('View available articles on landing page', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
    cy.visit('http://localhost:3001')

    cy.get('h1')
      .should('contain', 'Fake News')
    cy.get('.list-top-articles')
      .should('contain', 'Which drugs can kill you?')
      .should('contain', 'Can soccer make you fat?')
      .should('contain', '5 ways to get lost in the forest')
    cy.get('.latest-articles')
      .should('contain', 'Researches have recently found out that...')
      .should('contain', 'Yesterday the famous soccer player Ronaldo was...')
      .should('contain', 'Autumn is here and everyone wants to get out...')
  })

  it('Articles do not load on the landing page', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      status: 200,
      response: 'fixture:cannot_list_articles.json'
    })
    cy.visit('http://localhost:3001')

    cy.get('#error')
      .should('contain', 'There are no articles here')
  })
})