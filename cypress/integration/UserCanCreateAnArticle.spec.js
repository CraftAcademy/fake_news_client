describe('User can create article', () => {
  it('successfully', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_created_article.json',
      status: 200
    })
    cy.visit('http://localhost:3001')


    cy.get('#write-article').click()

    cy.get('#article-form').within(()=> {
      cy.get('#title-input').type('Crazy things are going on atm omg!')
      cy.get('#content-input').type('content - YEAAAAAAAAAAAAAAAAAAAAH')

      cy.get('#submit-article').click()
    })

    cy.get('#response-message').should('contain', 'Article was successfully created')
  });
})