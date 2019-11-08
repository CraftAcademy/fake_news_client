describe('Journalist can create an article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_journalist_login.json',
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

    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-create').click()
    })
  })
  
  it('successfully creates an article', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_created_article.json',
      status: 200
    })

    cy.get('#article-form').within(() => {
      cy.get('select[id="categories"]').select('Sports')
      cy.get('#title-input').type('How much wood would a wood chuck chuck?')
      cy.get('#content-input').type('OMG do you even know how much wood it could chuck?')
      cy.get('#submit-article').click()
    })
    cy.get('#response-message').should('contain', 'Article was successfully created')
  })

  it('cannot create an article', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:cannot_create_article.json',
      status: 400
    })

    cy.get('#article-form').within(() => {
      cy.get('select[id="categories"]').select('Sports')
      cy.get('#title-input').type('Ho')
      cy.get('#content-input').type('OMG do you even know how much wood it could chuck?')
      cy.get('#submit-article').click()
    })
    cy.get('#response-message').should('contain', 'Title is too short (minimum is 3 characters)')
  })
})