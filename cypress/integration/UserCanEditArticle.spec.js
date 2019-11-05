describe('User can edit an article', () => {
  beforeEach(() => {
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
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.visit('http://localhost:3001/')

    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })

  it('can successfully edit an article if logged in', () => {
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_edits_article.json',
      status: 200
    })

    cy.get("#article_1")
      .click()
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

  it('cannot edit an article unless all input is valid', () => {
    cy.route({
      method: 'PUT',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:cannot_create_article.json',
      status: 400
    })
    
    cy.get("#article_1")
      .click()
    cy.get('#edit-article')
      .click()
    cy.get('#edit-form')
      .within(() => {
        cy.get('#edit-title')
          .type('Ch')
        cy.get('#edit-content')
          .type('Changing content')
        cy.get('#submit-change')
          .click()
      })
    cy.get('#response-message')
      .should('contain', 'Title is too short (minimum is 3 characters)')
  })
})
