import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Container, Grid } from 'semantic-ui-react'
import './ListArticle.css'

class ListArticle extends Component {
  state = {
    articles: [],
    errorMessage: null
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

  render() {
    const articles = this.state.articles
    let articleList
    let errorMessage

    if (this.state.errorMessage) {
      errorMessage = <p id="error">{this.state.errorMessage}</p>
    }

    if (articles !== []) {
      articleList = (
          <Grid.Row>
            {articles.map(article => {
              return <Grid.Column key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
              </Grid.Column>
            })}
          </Grid.Row>
      )
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
        </Grid>
        </Container>
      </>
    )
  }
}

export default ListArticle