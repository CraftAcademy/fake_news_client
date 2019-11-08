import React, { Component } from 'react'
import ArticleFormInput from './ArticleFormInput'
import { submitArticle } from '../Modules/ArticlesData'

class CreateArticle extends Component {

  state = {
    title: '',
    content: '',
    image: '',
    responseMessage: '',
    category: 'Politics'
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitArticleHandler = async () => {
    debugger
    const { title, content, image, category } = this.state
    let response = await submitArticle(title, content, image, category)

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

    articleForm = (
      <ArticleFormInput
        inputHandler={this.inputHandler}
        submitArticleHandler={this.submitArticleHandler}
        onAvatarDropHandler={this.onAvatarDropHandler}
      />
    )

    return (
      <div>
        {responseMessage}
        {articleForm}
      </div>
    )
  }
}

export default CreateArticle