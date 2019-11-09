import React, { Component } from 'react'
import { getArticles, getCategories } from '../../Modules/ArticlesData'
import { Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Politics extends Component {
  state = {
    articles: [],
    categories: []
  }

  componentDidMount() {
    this.getCategoryData()
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

  async getCategoryData() {
    let fetch = await getCategories();
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      this.setState({
        categories: fetch
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

  const extractCategoryId = () => {
    const categoryId = this.state.categories
    
  }

  render() {
    const {articles} = this.state
    let fullArticleList

    fullArticleList = (
      <>
        {articles.map(article => {
          return this.renderArticles(article)
        })}
      </>
    )

    return (
      <>
        <h1>Politics</h1>
        {fullArticleList}
      </>
    )
  }
}

export default Politics