import React, { Component } from "react"
import { getSpecificArticle } from '../Modules/ArticlesData'
import { Message, Container, Divider, Grid, Image } from 'semantic-ui-react'

class SingleArticle extends Component {

  state = {
    article: null,
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

  render() {
    const article = this.state.article
    let singleArticle
    let errorMessage

    if (this.state.errorMessage) {
      errorMessage =
        <Message id="flash-message">{this.state.errorMessage}</Message>
    }

    if (article !== null) {
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

    return (
      <>
        {singleArticle}
        {errorMessage}
      </>
    )
  }
}

export default SingleArticle