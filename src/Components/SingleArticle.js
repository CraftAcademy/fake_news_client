import React, { Component } from "react"
import { getSpecificArticle } from '../Modules/ArticlesData'
import EditFormInput from './EditFormInput'

class SingleArticle extends Component {

  state = {
    article: null,
    renderEditForm: false
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

  render() {
    const article = this.state.article
    let singleArticle
    let editForm

    if (article !== null) {
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
      editForm = (
        <EditFormInput />
      )
    }

    return (
      <>
        {singleArticle}
        {editForm}
      </>
    )
  }
}

export default SingleArticle