import React, { Component } from 'react'
import { submitArticle } from '../Modules/ArticlesData'
import ImageUploader from 'react-images-upload';



class CreateArticle extends Component {
  state = {
    title: '',
    content: '',
    image: '',
    renderArticleForm: false,
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

  submitArticleHandler = async() => {
    const { title, content, image } = this.state
    let response = await submitArticle(title, content, image)

    if(response.status === 200) {
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
      responseMessage = <p id="response-message">{this.state.responseMessage}</p>
    }

    if (this.state.renderArticleForm) {
      articleForm = (
        <div id="article-form">
          <input name="title" id="title-input" onBlur={this.inputHandler} />
          <input name="content" id="content-input" onBlur={this.inputHandler}/>

          <ImageUploader 
            buttonText={"Upload article image (jpg/png)"}
            withPreview
            withIcon
            withLabel={false}
            onChange={this.onAvatarDropHandler}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            singleImage={true}
          />

          <button id="submit-article" onClick={this.submitArticleHandler.bind(this)}>Submit Article</button>
        </div>
      )
    }
    return (
      <>
        <button onClick={this.renderForm} id="write-article">Write Article </button>

        {articleForm}
        {responseMessage}
      </>
    )
  }
}

export default CreateArticle