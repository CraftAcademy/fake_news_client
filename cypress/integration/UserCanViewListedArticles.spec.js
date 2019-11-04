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
    cy.get('.top-news')
      .should('contain', 'Which drugs can kill you?')
      .should('contain', 'Jonas is an amazing programmer!')
    cy.get('.latest-articles')
      .should('contain', 'Researches have recently found out that drugs can actually kill you. It is amazing how well they can kill you...')
      .should('contain', 'Once upon a time there was this amazing programmer in our team. Everybody wanted to be like Jonas, but not...')
  })

  it('Articles do not load on the landing page', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      status: 417,
      response: 'fixture:cannot_list_articles.json'
    })
    cy.visit('http://localhost:3001')

    cy.get('#error')
      .should('contain', 'There are no articles here')
  })
})