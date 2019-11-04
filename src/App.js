import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'
import { Header } from 'semantic-ui-react'
import './Components/CSS/App.css'
import FakeFunction from './Components/fakeFunction'

class App extends Component {

  render() {
    return (
      <>
        <Header as='h1'>Fake News</Header>
        <FakeFunction />
        <Login />
        <SignUp />
        <ListArticles />
        <CreateArticle />
      </>
    )
  }
}

export default App