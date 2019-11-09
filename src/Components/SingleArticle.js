import React, { Component } from "react"
import { getSpecificArticle, editArticle } from '../Modules/ArticlesData'
import EditFormInput from './EditFormInput'
import { Message, Container, Divider, Grid, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

    if (article !== null && this.state.renderEditForm === false && this.props.currentUser.attributes.role === 'journalist') {
      singleArticle = (
        <>
          <Container textAlign='justified' id="single-article">
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image src={article.image} alt='Article image'/>
                </Grid.Column>
                <Grid.Column >
                  <h3 id="article-title">{article.title}</h3>
                  <Divider />
                  <p id="article-content">{article.content}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Button onClick={this.renderForm} id="edit-article">Edit</Button>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      )
    } else if (article !== null && this.state.renderEditForm === false) {
      singleArticle = (
        <>
          <Container textAlign='justified' id="single-article">
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image src={article.image} alt='Article image'/>
                </Grid.Column>
                <Grid.Column >
                  <h3 id="article-title">{article.title}</h3>
                  <Divider />
                  <p id="article-content">{article.content}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
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
            <img src={article.image} alt='Article image' />
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

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(SingleArticle)