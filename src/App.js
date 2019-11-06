import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import CreateArticle from './Components/CreateArticle'
import Navbar from './Components/Navbar'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import './Components/CSS/App.css'
import PaymentForm from './Components/PaymentForm'

class App extends Component {

  render() {
    return (
      <>
        <Header as='h1'>Fake News</Header>
        <Navbar />
        <Route exact path='/' component={ListArticles}></Route>
        {this.props.currentUser.attributes.role === 'journalist' ? (
          <Route exact path='/create' component={CreateArticle} />
        ) : (
          <Redirect to='/' />
        )}
        <Route exact path='/login' component={Login}>
          {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path='/signup' component={SignUp}>
          {this.props.currentUser.isSignedIn ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route exact path='/payment' component={PaymentForm}>
          {this.props.currentUser.isSignedIn ? <PaymentForm /> : <Redirect to="/" />}
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