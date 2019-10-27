describe('User can log in to application', () => {
  it('successfully log in ', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })

    cy.visit('http://localhost:3001')
    cy.get('#login-button').click()
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })
});