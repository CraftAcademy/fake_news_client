describe('User can sign up to application', () => {

  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
    cy.visit('http://localhost:3001')
  })

  it('successfully signs up with valid credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth',
      response: 'fixture:successful_user_signup.json',
      status: 200,
      headers: {
        'uid': 'user@mail.com'
      }
    })

    cy.get('#signup-button').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })

  it('cannot sign up with invalid password credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth',
      response: 'fixture:unsuccessful_signup.json',
      status: 422,
      // headers: {
      //   'uid': 'user@mail.com'
      // }
    })

    cy.get('#signup-button').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('passwordd')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#error-message').should('contain', 'Password confirmation doesn\'t match Password')
  })
});