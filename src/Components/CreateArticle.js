import React, { Component } from 'react'
import ArticleFormInput from './ArticleFormInput'
import { submitArticle } from '../Modules/ArticlesData'

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

  submitArticleHandler = async () => {
    const { title, content, image } = this.state
    let response = await submitArticle(title, content, image)

    if (response.status === 200) {
      this.setState({
        responseMessage: response.data.message
      })
    } else {
      this.setState({
        responseMessage: response
      })
    }
  }

  onAvatarDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs
    })
  }

  render() {
    let articleForm
    let responseMessage

    if (this.state.responseMessage) {
      responseMessage =
        <p id="response-message">{this.state.responseMessage}</p>
    }

    if (this.state.renderArticleForm) {
      articleForm = (
        <ArticleFormInput
          inputHandler={this.inputHandler}
          submitArticleHandler={this.submitArticleHandler}
          onAvatarDropHandler={this.onAvatarDropHandler} 
          />
      )
    }

    return (
      <div>
        <button onClick={this.renderForm} id="create-article">Create Article</button>
        {articleForm}
        {responseMessage}
      </div>
    )
  }
}

export default CreateArticle