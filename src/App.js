import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import CreateArticle from './Components/CreateArticle'
import Navbar from './Components/Navbar'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Route exact path='/' component={ListArticles}></Route>
        <Route exact path='/create' component={CreateArticle}></Route>
        <Route exact path='/login' component={Login}>
          {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <Login />}
        </Route>
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
)(App)