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
    showArticleId: null
  }

  async componentDidMount() {
    let response = await getArticles()

    if (response.status === 400) {
      this.setState({
        errorMessage: response.errorMessage
      })
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

  render() {
    const articles = this.state.articles
    let showArticle = this.state.showArticle
    let articleList
    let errorMessage
    let specificArticle

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    if (articles !== [] && showArticle === false) {
      articleList = (
        <Grid.Row>
          {articles.map(article => {
            //id=`article_1${article.id}`
            return <Grid.Column key={article.id} onClick={this.showSingleArticleHandler(article.id)}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </Grid.Column>
          })}
        </Grid.Row>
      )
    } 
    
    if (showArticle === true) {
      specificArticle = <SingleArticle key={this.state.showArticleId} />
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