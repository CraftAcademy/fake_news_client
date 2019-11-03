import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Header, Grid } from 'semantic-ui-react'
import './CSS/ListArticles.css'
import SingleArticle from './SingleArticle'

class ListArticles extends Component {
  state = {
    articles: [],
    errorMessage: null,
    showArticle: false,
    showArticleId: null
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  componentDidMount() {
    this.getArticlesData()
  }

  async getArticlesData() {
    let response = await getArticles();
    if (response.status === 200) {
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

  render() {
    const articles = this.state.articles
    let showArticle = this.state.showArticle
    let fullArticleList
    let topArticleList
    let errorMessage
    let specificArticle

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    if (showArticle === false) {
      fullArticleList = (
        <Grid.Row>
          {articles.map(article => {
            return <Grid.Column onClick={() => { this.showSingleArticleHandler(article.id) }} id={`article_${article.id}`} key={article.id}>
              <img src={article.image} alt="" />
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </Grid.Column>
          })}
        </Grid.Row>
      )
      topArticleList = (
        <Grid.Row>
          {articles.slice(1, 4).map(article => {
            return <Grid.Column onClick={() => { this.showSingleArticleHandler(article.id) }} id={`article_${article.id}`} key={article.id}>
              <img src={article.image} alt="" />
              <h3>{article.title}</h3>
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
        <div className="error-messages">
          {errorMessage}
        </div>
        <div className="top-news">
          <Header as='h2'>Top News</Header>
          <Grid centered container columns={3} className="latest-articles">
            {topArticleList}
          </Grid>
        </div>
        <div className="specific-news">
          <Grid centered container columns={3} className="latest-articles">
          {specificArticle}
          </Grid>
        </div>
        <div className="list-all-news">
        <Grid centered container columns={2} className="latest-articles">
          {fullArticleList}
        </Grid>
        </div>
      </>
    )
  }
}

export default ListArticles