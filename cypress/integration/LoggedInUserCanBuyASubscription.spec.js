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

  it('successfully signs up and enters the valid credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/payments',
      response: 'fixture:successful_payment.json',
      status: 200
    })
    cy.signup_user(
      "user@mail.com",
      "password",
      "password"
    );

    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-payment').click()
    })
    cy.get('#payment-form').should('contain', 'Please select a subscription plan')
    cy.get('#select-option').contains('option').click()
    cy.wait(2000);
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
    cy.get('#payment-feedback-message')
      .should('contain', 'Transaction successful')
  })

  it('successfully signs up but enters invalid credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/payments',
      response: 'fixture:successful_payment.json',
      status: 402
    })
    cy.signup_user(
      "user@mail.com",
      "password",
      "password"
    );
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-payment').click()
    })
    cy.get('#payment-form').should('contain', 'Please select a subscription plan')
    cy.get('#select-option').contains('option').click()
    cy.wait(2000);
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4242", { delay: 10 });
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
    cy.get('#invalid-credentials')
      .should('contain', 'Something went wrong, please try again')
  })

  it('successfully signs up but the subscription fails on the server side', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/payments',
      response: 'fixture:unsuccessful_payment.json',
      status: 402
    })
    cy.signup_user(
      "user@mail.com",
      "password",
      "password"
    );
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-payment').click()
    })
    cy.get('#payment-form').should('contain', 'Please select a subscription plan')
    cy.get('#select-option').contains('option').click()
    cy.wait(2000);
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("42424242424242424242", { delay: 10 });
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
    cy.get('#payment-feedback-message')
      .should('contain', 'Transaction unsuccessful')
  })
})