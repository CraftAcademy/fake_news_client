import stubLocation from "../support/stubLocation"

describe('User can view the website in their language', () => {

  it('successfully shows swedish UI', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    }),
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/?language=sv',
      response: 'Falska Nyheter'
    }),
    cy.visit(
      "http://localhost:3001",
      stubLocation({ latitude: 40.73061, longitude: 73.935242 })
    )

    cy.get('#hero-header')
      .should('contain', 'Falska Nyheter')
  })
})