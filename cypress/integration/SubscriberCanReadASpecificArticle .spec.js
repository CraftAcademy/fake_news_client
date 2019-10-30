describe('User can view full article', () => {
  
  it('user can succesfully view article', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/articles',
      response: 'fixture:successfully_view_article.json',
      status: 200
    })
    cy.visit('http://localhost:3001/')
    
    cy.get('.list-top-articles')
    cy.get('a[href*="readArticle').click()
  })
})