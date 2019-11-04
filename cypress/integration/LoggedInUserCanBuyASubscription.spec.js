describe('User can buy a subscription for the articles', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    }),
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles/1",
      response: "fixture:successful_user_login.json"
    }),
      cy.visit('http://localhost:3001')
  })

  it('successfully signs up and sees a subscription option', () => {
    cy.get('#signup-button').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
      cy.get('#subscribe-button').click()
      cy.get('#payment-form').should('contain', 'Please view our subscription plan:')
    })
  })
})