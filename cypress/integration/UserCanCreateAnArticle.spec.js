describe('User can create an article', () => {
  it('successfully creates an article', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_created_article.json',
      status: 200
    })
    cy.visit('http://localhost:3001/')

    cy.get('#create-article').click()
    cy.get('#article-form').within(() => {
      cy.get('#title-input').type('How much wood would a wood chuck chuck?')
      cy.get('#content-input').type('OMG do you even know how much wood it could chuck?')
      cy.get('#submit-article').click()
    })

    cy.get('#response-message').should('contain', 'Article was successfully created')
  })

  it('cannot create an article', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:cannot_create_article.json',
      status: 400
    })
    cy.visit('http://localhost:3001/')

    cy.get('#create-article').click()
    cy.get('#article-form').within(() => {
      cy.get('#title-input').type('Ho')
      cy.get('#content-input').type('OMG do you even know how much wood it could chuck?')
      cy.get('#submit-article').click()
    })

    cy.get('#response-message').should('contain', 'Title is too short (minimum is 3 characters)')
  })
})