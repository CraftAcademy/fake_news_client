import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Container, Grid } from 'semantic-ui-react'
import './CSS/ListArticles.css'
import SingleArticle from './SingleArticle'
import { connect } from 'react-redux'
import AlertModal from './AlertModal'

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

  articleIngress = (content, wordCount) => {
    let ingress = content.split(' ').slice(0, wordCount).join(' ')
    return ingress + ' ...'
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

    if (showArticle === false) {
      articleList = (
        <Grid.Row>
          {articles.map(article => {
            return <Grid.Column onClick={() => { this.showSingleArticleHandler(article.id) }} id={`article_${article.id}`} key={article.id}>
              <h2>{article.title}</h2>
              <p>{this.articleIngress(article.content, 20)}</p>
            </Grid.Column>
          })}
        </Grid.Row>
      )
    }

    if (showArticle === true && this.props.currentUser.isSignedIn) {
      specificArticle = <SingleArticle
        articleId={this.state.showArticleId}
        renderErrorMessage={this.setErrorMessage}
      />
    } 
    
    if (showArticle === true && this.props.currentUser.isSignedIn === false) {
      specificArticle = <AlertModal />
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

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(ListArticles)