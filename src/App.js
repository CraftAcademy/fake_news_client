import React, { Component, Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'
import FakeFunction from './Components/fakeFunction'
import { Header } from 'semantic-ui-react'
import "./i18n";
import './Components/CSS/App.css'

class App extends Component {

  render() {
    return (
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <Header as='h1'>Fake News</Header>
          <FakeFunction />
          <Login />
          <SignUp />
          <ListArticles />
          <CreateArticle />
        </Suspense>
      </>
    )
  }
}

export default App