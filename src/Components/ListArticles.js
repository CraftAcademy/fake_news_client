import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Header, Grid, Message, Card, Image, Divider } from 'semantic-ui-react'
import './CSS/ListArticles.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

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

  articleIngress = (content, wordCount) => {
    let ingress = content.split(' ').slice(0, wordCount).join(' ')
    return ingress + '...'
  }

  renderArticles(article) {
    return (
      <Grid.Column id="single">
        <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`} >
          <Card>
            <Image src={article.image} alt="" wrapped ui={false} />
            <Card.Content>
            <h3>{article.title}</h3>
            <Divider />
            <p>{this.articleIngress(article.content, 20)}</p>
            </Card.Content>
          </Card>
        </NavLink>
      </Grid.Column> 
    )
  }

  render() {
    const {articles} = this.state
    let articleList, errorMessage, welcomeMessage
    const { t } = this.props;

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <h3 id="welcome-message">Hello {this.props.currentUser.attributes.email}</h3>
    }

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    articleList = (
      <Grid.Row>
        {articles.sort().reverse().map(article => {
          return this.renderArticles(article)
        })}
      </Grid.Row>
    )

    return (
      <>
        {welcomeMessage}

        <div className="error-messages">
          {errorMessage}
        </div>
        <div className="list-all-news" className="top-news">
        <Header as='h2'>{t("top.header")}</Header>
          <Grid centered container columns={3} className="latest-articles">
            {articleList}
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
