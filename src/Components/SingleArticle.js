import React, { Component } from "react"
import { getSpecificArticle, editArticle } from '../Modules/ArticlesData'
import EditFormInput from './EditFormInput'
import { Message } from 'semantic-ui-react'

class SingleArticle extends Component {

  state = {
    article: null,
    renderEditForm: false,
    title: '',
    content: '',
    image: '',
    responseMessage: '',
    errorMessage: null
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async componentDidMount() {
    let response = await getSpecificArticle(this.props.match.params.id)
    if (response.status === 200) {
      this.setState({
        article: response.data
      })
    } else {
      this.setErrorMessage(response)
    }
  }

  renderForm = () => {
    this.setState({
      renderEditForm: !this.state.renderEditForm
    })
  }

  onAvatarDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs
    })
  }

  editHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitChangeHandler = async () => {
    const { title, content, image } = this.state
    let response = await editArticle(title, content, image)
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

  render() {
    const article = this.state.article
    let singleArticle
    let responseMessage
    let errorMessage

    if (this.state.responseMessage) {
      responseMessage =
        <p id="response-message">{this.state.responseMessage}</p>
    }

    if (this.state.errorMessage) {
      errorMessage =
        <Message id="flash-message">{this.state.errorMessage}</Message>
    }

    if (article !== null && this.state.renderEditForm === false) {
      singleArticle = (
        <>
          <div id="single-article">
            <img src={article.image} alt=""/>
            <p id="article-title">{article.title}</p>
            <p id="article-content">{article.content}</p>
          </div>
          <button onClick={this.renderForm} id="edit-article">Edit</button>
        </>
      )
    }
    
    if (this.state.renderEditForm) {
      singleArticle = (
        <>
          <EditFormInput 
            editHandler={this.editHandler}
            submitChangeHandler={this.submitChangeHandler}
            onAvatarDropHandler={this.onAvatarDropHandler}
          />
          <div id="single-article">
            <img src={article.image} alt="" />
            <p id="article-title">{article.title}</p>
            <p id="article-content">{article.content}</p>
          </div>
        </>
      )
    }

    return (
      <>
        {singleArticle}
        {responseMessage}
        {errorMessage}
      </>
    )
  }
}

export default SingleArticle