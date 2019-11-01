describe('User can edit an article', () => {
  before(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles",
      response: "fixture:list_articles.json"
    }),
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles/1",
      response: "fixture:successfully_view_article.json"
    }),
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_edits_article.json',
      status: 200
    })

    cy.visit('http://localhost:3001/')
  })

  it('successfully edits an article', () => {
    cy.get("#article_1")
      .click()
    cy.get('#single-article')
    cy.get('#edit-article')
      .click()
    cy.get('#edit-form')
      .within(() => {
        cy.get('#edit-title')
          .type('Changing title')
        cy.get('#edit-content')
          .type('Changing content')
        cy.get('#submit-change')
          .click()
      })
    cy.get('#response-message')
      .should('contain', 'Article was successfully edited')
  })
})
