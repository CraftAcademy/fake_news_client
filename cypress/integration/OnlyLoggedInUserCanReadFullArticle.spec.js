describe('User can view single article if logged in', () => {

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
    });
    cy.visit('http://localhost:3001')
  })

  it('successfully views article', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })

    cy.get('#login-button').click()
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')

    cy.get('#article_1')
      .click()
    cy.get('#single-article')
      .within(() => {
        cy.get('#article-title')
          .should('contain', 'Which drugs can kill you?')
        cy.get('#article-content')
        .should('contain', 'Researches have recently found out that drugs can actually kill you. It is amazing how well they can kill you like you would not believe it.')
      })
  })

  it('receives message prompting login', () => {
    cy.get('#article_1')
      .click()
    cy.get("#flash-message")
      .should('be.visible')
      .wait(5000)
    cy.get("#flash-message")
      .should('not.be.visible')
  })
});