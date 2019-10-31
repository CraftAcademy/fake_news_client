import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Container, Grid } from 'semantic-ui-react'
import './CSS/ListArticles.css'
import SingleArticle from './SingleArticle'

class ListArticles extends Component {
  state = {
    articles: [],
    errorMessage: null,
    showArticle: false,
    showArticleId: null,
    hoverState: false
  }

  setErrorMessage= (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async componentDidMount() {
    let response = await getArticles()

    if (response.status === 400) {
      this.setErrorMessage(response.errorMessage)
    } else {
      this.setState({
        articles: response
      })
    }
  }

  showSingleArticleHandler = (articleId) => {
    this.setState({
      showArticle: true,
      showArticleId: articleId
    })
  }

  // onMouseOver = () => {
  //   this.setState({
  //     hoverState: !this.state.hoverState
  //   })
  // }

  // onMouseOver={() => {this.onMouseOver()}} style={{ textDecoration: this.state.hoverState ? 'underline' : 'none' }}

  render() {
    const articles = this.state.articles
    let showArticle = this.state.showArticle
    let articleList
    let errorMessage
    let specificArticle

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    if (showArticle === false) {
      articleList = (
        <Grid.Row>
          {articles.map(article => {
            return <Grid.Column onClick={() => {this.showSingleArticleHandler(article.id)}} id={`article_${article.id}`} key={article.id}>
              <h2 >{article.title}</h2>
              <p>{article.content}</p>
            </Grid.Column>
          })}
        </Grid.Row>
      )
    } 
    
    if (showArticle === true) {
      specificArticle = <SingleArticle 
                        articleId={this.state.showArticleId} 
                        renderErrorMessage={this.setErrorMessage}
                        />
    }

    return (
      <>
        <h1>Fake News</h1>
        <hr></hr>
        <Container className="list-top-articles">
          <h2>Top News</h2>
          <Grid centered container columns={3} className="latest-articles">
            {articleList}
            {errorMessage}
            {specificArticle}
          </Grid>
        </Container>
      </>
    )
  }
}

export default ListArticles