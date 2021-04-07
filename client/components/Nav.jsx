import React from 'react'
import { Route, Link } from 'react-router-dom'

import Settings from './Settings'
import Matches from './Matches'
import Stack from './Stack'
import { connect } from 'react-redux'

class Nav extends React.Component {
  render () {
    return (
      <>
        <div className="flexAround nav">
          <Link style={{ textDecoration: 'none' }} to={'/settings'}><button className="nav btn">⚙️</button></Link>
          <Link style={{ textDecoration: 'none' }} to={'/stack'}><button className="nav btn">🦴</button></Link>
          <Link style={{ textDecoration: 'none' }} to={'/matches'}><button className="nav btn">🐶</button></Link>
        </div>
        <div>
          <Route path={'/matches'} component={Matches} />
          <Route path={'/stack'} exact={true} component={Stack} />
          <Route path={'/settings'} component={Settings} />

        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Nav)
