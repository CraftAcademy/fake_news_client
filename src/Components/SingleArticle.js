import React, { Component } from "react";
import { getSpecificArticle } from '../Modules/ArticlesData'

class SingleArticle extends Component {

  state = {
    article: null
  }

  async componentDidMount() {
    let response = await getSpecificArticle(this.props.articleId)
    if (response.status === 200) {
      this.setState({
        article: response.data
      })
    } else {
      debugger
      this.props.renderErrorMessage(response)
    }

  }

  render() {

    let singleArticle
    const article = this.state.article
    if (article !== null) {
      singleArticle = (
        <div id="single-article">
          <p id="article-title">{article.title}</p>
          <p id="article-content">{article.content}</p>
        </div>
      )
    }
    return (
      <>
        {singleArticle}
      </>
    );
  }
};

export default SingleArticle