import React, { Component } from 'react'
import { getArticles } from '../Modules/ArticlesData'

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
        <div>
          {articles.map(article => {
            return <div key={article.id}>
              <div id='most-recent-articles'>
                <p>{article.title}</p>
                <p>{article.content}</p>
              </div>
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
        {errorMessage}
      </>
    )
  }
}

export default ListArticle