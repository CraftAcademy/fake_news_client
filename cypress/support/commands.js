Cypress.Commands.add("signup_user", (email, password, password_confirmation) => {
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
});