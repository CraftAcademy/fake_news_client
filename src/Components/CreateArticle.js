import React, { Component } from 'react'

class CreateArticle extends Component {

  state = {
    title: '',
    content: '',
    image: '',
    renderArticleForm: false
  }

  renderForm = () => {
    this.setState({
      renderArticleForm: !this.state.renderArticleForm
    })
  }

  render() {
    let articleForm

    if (this.state.renderArticleForm) {
      articleForm = (
        <ArticleFormInput />
      )
    }

    return (
      <div>
        <button id="create-article" onClick={this.renderForm}>Create Article</button>
      </div>
    )
  }
}

export default CreateArticle
