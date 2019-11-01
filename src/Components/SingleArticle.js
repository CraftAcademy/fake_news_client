import React, { Component } from "react"
import { getSpecificArticle, editArticle } from '../Modules/ArticlesData'
import EditFormInput from './EditFormInput'

class SingleArticle extends Component {

  state = {
    article: null,
    renderEditForm: false,
    title: '',
    content: '',
    image: '',
    responseMessage: ''
  }

  async componentDidMount() {
    let response = await getSpecificArticle(this.props.articleId)
    if (response.status === 200) {
      this.setState({
        article: response.data
      })
    } else {
      this.props.renderErrorMessage(response)
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

    if (this.state.responseMessage) {
      responseMessage =
        <p id="response-message">{this.state.responseMessage}</p>
    }

    if (article !== null && this.state.renderEditForm === false) {
      singleArticle = (
        <>
          <div id="single-article">
            <p id="article-title">{article.title}</p>
            <p id="article-content">{article.content}</p>
          </div>
          <button onClick={this.renderForm} id="edit-article">Edit</button>
        </>
      )
    }
    
    if (this.state.renderEditForm) {
      singleArticle = (
        <EditFormInput 
          editHandler={this.editHandler}
          submitChangeHandler={this.submitChangeHandler}
          onAvatarDropHandler={this.onAvatarDropHandler}
        />
      )
    }

    return (
      <>
        {singleArticle}
        {responseMessage}
      </>
    )
  }
}

export default SingleArticle