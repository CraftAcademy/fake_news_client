import React, { Component } from 'react'
import { getArticles, getCategories } from '../../Modules/ArticlesData'
import { Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Politics extends Component {
  state = {
    articles: [],
    categories: [],
    categoryName: ''
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async componentDidMount() {
    let categories = await getCategories()
    let categoryName = 'Politics'
    this.setState({
      categoryName: categoryName,
      categories: categories
    })
    this.getArticlesData()
  }


  // async componentDidMount() {
  //   window.scrollTo(0, 0);
  //   let categories = await getCategoryNames()
  //   let categoryName = this.props.location.pathname.substring(1)
  //   this.setState({
  //     categoryName: categoryName,
  //     categories: categories
  //   })
  //   axios.get('/api/v1/articles').then(response => {
  //     this.setState({ articles: response.data });
  //   })
  // }



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

  extractCategoryId() {
    const categoryList = this.state.categories
    categoryList.map(c => {
      if (c.name === 'Politics') {
        console.log(c)
        return (
          {}
        )
      }
    })
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