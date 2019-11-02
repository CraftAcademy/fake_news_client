describe('User can sign up to application', () => {
  it('successfully signs up', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth',
      response: 'fixture:successful_user_login.json',
      status: 200,
      headers: {
        'uid': 'user@mail.com'
      }
    })

    cy.visit('http://localhost:3001')
    cy.get('#signup-button').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })
});