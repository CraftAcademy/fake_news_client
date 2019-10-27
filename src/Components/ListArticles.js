import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'
import { Container, Grid } from 'semantic-ui-react'
import './ListArticles.css'

class ListArticles extends Component {
  state = {
    articles: [],
    errorMessage: null
  }

  // componentDidMount() {
  //   this.getArticlesData()
  // }

  // async getArticlesData() {
  //   let response = await getArticles();

  //   if (response.status === 400) {
  //     debugger
  //     this.setState({
  //       errorMessage: response.errorMessage
  //     }, () => {
  //       this.props.renderArticleGetStateProps();
  //     })
  //   } else {
  //     debugger
  //     this.setState({
  //       articles: response
  //     }, () => {
  //       this.props.renderArticleGetState();
  //     })
  //   }
  // }

  render() {
    const articles = this.state.articles
    let articleList
    let errorMessage

    if (this.props.getArticlesIndexProps === true) {
      debugger
      this.getArticlesData()
    } 
    if (this.props.getArticlesIndex === true) {
      debugger
      this.getArticlesData()
    } 


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

export default ListArticles