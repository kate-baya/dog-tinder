import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser, getUsers } from '../apis/usersApi'
import { updateMatches, getMatches } from '../apis/matches'
import { receiveUsers } from '../actions/index'
import { useSwipeable } from 'react-swipeable'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function Stack (props) {
  const [state, setState] = useState({
    info: false,
    loggedUser: {
      id: ''
    },
    user: {},
    emptyStack: false,
    show: false
  })

  useEffect(() => {
    getMatches(props.dispatch)
    getUsers()
      .then(users => {
        props.dispatch(receiveUsers(users))
        return null
      })
      .catch(err => console.log(err))
    getUser()
      .then(loggedUser => {
        console.log(loggedUser)
        setState({ ...state, loggedUser })
        return null
      })
      .catch(err => console.log(err))
  }, [])

  const setRandomUser = (users, loggedUser) => {
    const user = getRandomProfile(users, loggedUser)
    setState({ ...state, user })
  }

  if (props.users.length > 1 && state.loggedUser.id && !state.user.id) {
    setRandomUser(props.users, state.loggedUser)
  }

  const likeUser = (e, user) => {
    if (e.preventDefault) e.preventDefault()
    updateMatches(true, user, props.dispatch)
      .then(() => {
        getMatches(props.dispatch)
        setRandomUser(props.users, state.loggedUser)
        return null
      })
      .catch(err => console.log(err))
  }

  const dislikeUser = (e, user) => {
    if (e.preventDefault) e.preventDefault()
    updateMatches(false, user, props.dispatch)
    setRandomUser(props.users, state.loggedUser)
  }

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => likeUser(eventData, user),
    onSwipedLeft: (eventData) => dislikeUser(eventData, user)
  })

  const user = state.user

  const emptyStack = props.users.length === 1

  useEffect(() => {
    if (props.matchesLoaded) {
      setState({ ...state, show: true })
    }
  }, [props.matches.length])

  const recentMatch = props.matches[props.matches.length - 1] || {}

  const hideModal = () => {
    setState({ ...state, show: false })
  }

  return (
    <>
      {state.show &&
        <div >
          <section className="modal-main">
            <div className="modalPadding">
              <img className="modalImg" src={recentMatch.image}/>
              <p>It's a match!</p>
              <p>Show {recentMatch.dog_name} some ❤️</p>
              <Link style={{ textDecoration: 'none' }} to={'/matches'}><button><a href="#">Say Hi!</a></button></Link>
              <br/>
              <Link style={{ textDecoration: 'none' }} to={'/stack'}><button onClick={hideModal}><a href="#">Keep Swiping</a></button></Link>
            </div>
          </section>
        </div>
      }
      {!emptyStack && !state.show && <div>
        <div className="relative" {...handlers}>
          <img src={user.image} className="stackImages"/>
          <div className="profileHeader">
            <p className="pExtra" onClick={(e) => { e.preventDefault(); setState({ ...state, info: !state.info }) }}>{user.dog_name}, {user.breed} ℹ️</p>
            {state.info && <div>
              <p>{user.location}</p>
              <p>{user.owner_name}</p>
              <p>{user.bio}</p>
            </div>}
          </div>
        </div>

        <div className="flex yesNo">
          <button className="btn" href="#" onClick={(e) => dislikeUser(e, user)}>❌</button>
          <button className="btn" href="#" onClick={(e) => likeUser(e, user)}>🦴</button>
        </div>
      </div>}

      {emptyStack && <div className="noDoggos">
        <p>Looks like there are no doggos left in your area</p>
        <p>😲</p>
        <p>Check back later!</p>
      </div>}

      <Footer/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    matches: state.matches,
    matchesLoaded: state.matchesLoaded
  }
}

export default connect(mapStateToProps)(Stack)

const getRandomProfile = (users, loggedUser) => {
  const otherUsers = users.filter(users => users.id !== loggedUser.id)
  const randomProfile = Math.floor(Math.random() * otherUsers.length)
  const user = otherUsers[randomProfile] || {}
  return user
}
