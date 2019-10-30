import React, { Component } from "react";
import { getSpecificArticle } from '../Modules/ArticlesData'

class SingleArticle extends Component {

  state = {
    article: null
  }

  async componentDidMount() {
    let response = await getSpecificArticle(this.props.key)
    this.setState({
      article: response
    })
  }

  render() {
    const article = this.state.article
    return (
      <>
        <div>
          <h1>Test!</h1>
          {article.title}
          {article.content}
        </div>
      </>
    );
  }
};

export default SingleArticle