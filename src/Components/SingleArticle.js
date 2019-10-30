import React, { Component } from "react";
import { getSpecificArticle } from '../Modules/ArticlesData'

class SingleArticle extends Component {

  state = {
    article: null
  }

  async componentDidMount() {
    debugger;
    let response = await getSpecificArticle(this.props.key)
    this.setState({
      article: response
    })
  }

  render() {

    let singleArticle
    const article = this.state.article
    if (article !== null) {
      singleArticle = (
        <div id="single-article">
          <h1>Test!</h1>
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