import stubLanguages from "../support/stubLanguages"

describe('User can view the website in their language', () => {

  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:list_articles.json'
    }),
    cy.visit(
      "http://localhost:3001",
      stubLanguages(['sv', 'sv-SE'])
    )
  })

  it('successfully shows swedish UI', () => {
    cy.get('#hero-header')
      .should('contain', 'Falska Nyheter')
  })
})