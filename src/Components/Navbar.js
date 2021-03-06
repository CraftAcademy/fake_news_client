import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import Logout from './Logout'
import './CSS/Navbar.css'

const Navbar = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Header id="hero-header" as='h1'>{t("navbar.header")}</Header>
      <Header id="hero-mini-header" as='h2'>{t("navbar.miniheader")}</Header>
      <Menu stackable id="navbar">
        <Menu.Item>
          <NavLink id='nav-home' to='/'>{t("navbar.home")}</NavLink>
        </Menu.Item>
        {props.currentUser.attributes.role === 'journalist' && (
          <Menu.Item>
            <NavLink id='nav-create' to='/create'>{t("navbar.create")}</NavLink>
          </Menu.Item>
        )}
        <Menu.Menu position="right">
        <Menu.Item>
        <NavLink id='cat-politics' to='/politics'>{t("navbar.p")}</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='cat-economics' to='/economics'>{t("navbar.e")}</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='cat-sports' to='/sports'>{t("navbar.s")}</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='cat-tech' to='/tech'>{t("navbar.t")}</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='cat-leisure' to='/leisure'>{t("navbar.le")}</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='cat-lifestyle' to='/lifestyle'>{t("navbar.li")}</NavLink>
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          {props.currentUser.isSignedIn && props.currentUser.attributes.role === 'user' && (
            <Menu.Item>
              <NavLink id='nav-payment' to='/payment'>{t("navbar.subscribe")}</NavLink>
            </Menu.Item>
          )}
          {props.currentUser.isSignedIn ? (
            <Logout /> ) : (
            <Menu.Item>
              <NavLink id='nav-login' to='/login'>{t("navbar.login")}</NavLink>
            </Menu.Item>
          )}
          {!props.currentUser.isSignedIn && (
            <Menu.Item>
              <NavLink id='nav-signup' to='/signup'>{t("navbar.signup")}</NavLink>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(Navbar)
