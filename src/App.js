import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'
import { Header } from 'semantic-ui-react'
import './Components/CSS/App.css'
import CheckOutForm from './Components/CheckOutForm'

class App extends Component {

  render() {
    return (
      <>
        <Header as='h1'>Fake News</Header>
        <Login />
        <SignUp />
        <ListArticles />
        <CreateArticle />
        <CheckOutForm />
      </>
    )
  }
}

export default App