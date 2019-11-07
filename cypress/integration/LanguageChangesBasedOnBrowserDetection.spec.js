import stubLocation from "../support/stubLocation"

describe('User can view the website in their language', () => {

  beforeEach(() => {
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
      stubLocation({ latitude: 57.7089, longitude: 11.9746 })
    )
  })

  it('successfully shows swedish UI', () => {
    cy.get('#hero-header')
      .should('contain', 'Falska Nyheter')
  })
})