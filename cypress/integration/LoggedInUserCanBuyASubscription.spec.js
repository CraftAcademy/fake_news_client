describe('User can buy a subscription for the articles', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    })
      cy.visit('http://localhost:3001')
  })

  it('successfully signs up and sees a subscription option', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/auth',
      response: 'fixture:successful_user_signup.json',
      status: 200
    })

    cy.get('#signup-button').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')

    cy.get('#subscribe-button').click()
    cy.get('#payment-form').should('contain', 'Please select a subscription plan:')
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4242424242424242", { delay: 10 });
    });
    cy.get('iframe[name^="__privateStripeFrame6"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="exp-date"]')
        .type("1222");
    });
    cy.get('iframe[name^="__privateStripeFrame7"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cvc"]')
        .type("223");
    });
    cy.get("#submit-payment")
      .click()
    cy.get('#successful-payment')
      .should('contain', 'Transaction successful')
  })
})