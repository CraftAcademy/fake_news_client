import React, { Component } from 'react'
import axios from 'axios'

class ListArticle extends Component {
  state = {
    articlesData: []
  }

  componentDidMount() {
    axios.get('./cypress/fixtures/list_articles.json')
      //   axios.get('http://localhost/3001/api/v1/articles/')
      .then(response => {
        debugger;
        this.setState({
          articlesData: response.data
        })
    })
  }

  render() {
    const articles = this.state.articlesData
    let articleList

    if (articles !== []) {
      articleList = (
        <div>
          {articles.map(article => {
            return <div key={article.id}>
              <p>{article.title}</p>
            </div>
          })}
        </div>
      )
    }
    return (
      <>
        <h1>Fake News</h1>
        <div className="list-top-articles">
          {articleList}
        </div>
      </>
    )
  }
}

export default ListArticle