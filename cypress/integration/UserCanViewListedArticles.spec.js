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
    cy.get('.list-top-articles').find('div')
      .should('contain', 'Which drugs can kill you?')
      .should('contain', 'Researches have recently found out that...')
    cy.get('.list-top-articles').find('div')
      .should('contain', 'Can soccer make you fat?')
      .should('contain', 'Yesterday the famous soccer player Ronaldo was...')
    cy.get('.list-top-articles').find('div')
      .should('contain', '5 ways to get lost in the forest')
      .should('contain', 'Autumn is here and everyone wants to get out...')
  })

  it('View available articles on landing page', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      status: 400,
      response:  {
        message: 'Network Error'
      }
    })
    cy.visit('http://localhost:3001')

    cy.get('#error')
      .should('contain', 'Request failed with status code 400')
  })
})