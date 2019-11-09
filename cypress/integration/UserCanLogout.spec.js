describe('User can log out to application', () => {
  it('successfully log out ', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3000/auth/sign_out',
      response: 'fixture:successful_user_logout.json',
      status: 200
    })
    
    cy.visit('http://localhost:3001')
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

    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-logout').click()
      })
      cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login')
      })
  })
});