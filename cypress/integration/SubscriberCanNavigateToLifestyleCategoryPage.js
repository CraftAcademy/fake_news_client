describe('Subscriber can get to page that represents specific category', () => {

  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles",
      response: "fixture:list_articles.json"
    }),
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_subscriber_login.json',
      status: 200
    })
    
    cy.visit('http://localhost:3001')
  })

  it(' subscriber successfully navigates to Lifestyle category page', () => {
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('subscriber@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello subscriber@mail.com')

    cy.get('#navbar')
      .within(() => {
        cy.get('#cat-lifestyle').click()
      })
    cy.get('#lifestyle-header')
      .should('contain', 'Lifestyle')
  })
})