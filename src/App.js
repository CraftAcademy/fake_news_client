import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import CreateArticle from './Components/CreateArticle'
import Navbar from './Components/Navbar'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Route path='/' component={ListArticles}></Route>
        <Route exact path='/create' component={CreateArticle}></Route>
        <Route exact path='/login' component={Login}></Route>
      </>
    )
  }
}

export default App