import React, { Component } from 'react'
import { getArticles, getCategories } from '../../Modules/ArticlesData'
import { Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Politics extends Component {
  state = {
    articles: [],
    categories: [],
    categoryName: 'Politics'
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async componentDidMount() {
    let categories = await getCategories()
    this.setState({
      categories: categories
    })
    this.getArticlesData()
  }

  async getArticlesData() {
    debugger
    let fetch = await getArticles();
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      debugger
      this.setState({
        articles: fetch
      })
    }
  }

  renderArticles(article) {
    return (
      <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`} >
        <Image src={article.image} alt="" wrapped ui={false} />
        <h3>{article.title}</h3>
      </NavLink>
    )
  }

  render() {
    let { articles, categoryName } = this.state
    let filteredArticleList = []
    let errorMessage
    let politicalArticles

    articles.forEach(article => {
      debugger
      if (article.category.name === categoryName) {
        return filteredArticleList.push(article)
      } else {
        errorMessage = <p>There are no Articles in this category</p>
      }
    })

    politicalArticles = (
      filteredArticleList.map(article => {
        debugger
        return (
          <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`} >
            <Image src={article.image} alt="" wrapped ui={false} />
            <h3>{article.title}</h3>
          </NavLink>
        )
      }
    ))

    return (
      <>
        <h1>Politics</h1>
        {politicalArticles}
        {errorMessage}
      </>
    )
  }
}

export default Politics