import React, { Component } from 'react'
import ArticleFormInput from './ArticleFormInput'

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

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitArticleHandler = () => {
    
  }

  render() {
    let articleForm

    if (this.state.renderArticleForm) {
      articleForm = (
        <ArticleFormInput 
        inputHandler={this.inputHandler}
        submitArticleHandler={this.submitArticleHandler} />
      )
    }

    return (
      <div>
        <button onClick={this.renderForm} id="create-article">Create Article</button>
      {articleForm}
      </div>
    )
  }
}

export default CreateArticle