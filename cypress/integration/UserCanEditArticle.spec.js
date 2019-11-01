describe('User can edit an article', () => {
  before(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    }),
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles",
      response: "fixture:list_articles.json"
    }),
    cy.visit('http://localhost:3001/')
    cy.get('#login-button').click()
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })

  it('successfully edits an article', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_edits_article.json',
      status: 200
    })

    cy.get("#article_1")
      .click()
    cy.get('#single-article')
      .within(() => {
        cy.get('#edit-article')
          .click()
      })
    cy.get('#edit-form')
      .within(() => {
        cy.get('#edit-title')
          .type('Changing title')
        cy.get('#edit-content')
          .type('Changing content')
        cy.get('#submit-change')
          .click()
      })
    cy.get('#response')
      .should('contain', 'Article was successfully edited')
  })
})
