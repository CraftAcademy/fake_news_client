import React, { Component } from 'react'
import { getArticles } from '../../Modules/ArticlesData'
import { Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Sports extends Component {
  state = {
    articles: [],
    categoryName: 'Sports'
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

  render() {
    let { articles, categoryName } = this.state
    let filteredArticleList = []
    let errorMessage
    let sportsArticles

    articles.forEach(article => {
      if (article.category.name === categoryName) {
        return filteredArticleList.push(article)
      }
    })

    sportsArticles = (
      filteredArticleList.map(article => {
        debugger
        return (
          <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`} >
            <Image src={article.image} alt="" wrapped ui={false} />
            <h3>{article.title}</h3>
            <h3>{article.title}</h3>
          </NavLink>
        )
      }
    ))

    return (
      <>
        <h1>Sports</h1>
        {sportsArticles}
        {errorMessage}
      </>
    )
  }
}

export default Sports