describe('User can view full article', () => {

  it('View available articles on landing page', () => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles",
      response: "fixture:list_articles.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles/1",
      response: "fixture:successfully_view_article.json"
    });
    cy.visit('http://localhost:3001')

    cy.get("#article_1")
          .click()
    cy.get('#single-article')
      .within(() => {
        cy.get('#article-title')
          .should('contain', 'Which drugs can kill you?')
        cy.get('#article-content')
          .should('contain', 'Researches have recently found out that...')
      })
  })
})

describe('User cannot view full article', () => {

  it('View available articles on landing page', () => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles",
      response: "fixture:list_articles.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/v1/articles/20",
      response: "fixture:cannot_view_article.json",
      status: 400
    });
    cy.visit('http://localhost:3001')

    cy.get("#article_1")
          .click()
        cy.get('.list-top-articles')
          .should('contain', "The article couldn't be found")
      })
  })