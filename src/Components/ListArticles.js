import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Header, Grid, Message } from 'semantic-ui-react'
import './CSS/ListArticles.css'
import SingleArticle from './SingleArticle'
import { connect } from 'react-redux'

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
    let fetch = await getArticles();
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      this.setState({
        articles: fetch
      })
    }
  }

  showSingleArticleHandler = (articleId) => {
    this.setState({
      showArticle: true,
      showArticleId: articleId
    })
  }

  renderArticles(article) {
    return (
      <Grid.Column 
        onClick={() => { this.showSingleArticleHandler(article.id) }} 
        id={`article_${article.id}`} 
        key={article.id}>
          <img src={article.image} alt="" />
          <h3>{article.title}</h3>
          <p>{article.content}</p>
      </Grid.Column>
    )
  }

  render() {
    const {articles, showArticle} = this.state
    let fullArticleList, topArticleList, errorMessage, specificArticle, welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <Message> <h3 id="welcome-message">Hello {this.props.currentUser.attributes.email}</h3></Message>
    }

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    if (showArticle === false) {
      fullArticleList = (
        <Grid.Row>
          {articles.map(article => {
            return this.renderArticles(article)
          })}
        </Grid.Row>
      )
      topArticleList = (
        <Grid.Row>
          {articles.slice(0, 3).map(article => {
            return this.renderArticles(article)
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
        {welcomeMessage}

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

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(ListArticles) 