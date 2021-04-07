import React from 'react'

import firebaseApp from '../firebase.config'

import ChatRoom from './chat/Chatroom'
import SignIn from './chat/SignIn'
import SignOut from './chat/SignOut'

import { useAuthState } from 'react-firebase-hooks/auth'

const auth = firebaseApp.auth()

function Chat (props) {
  const [user] = useAuthState(auth)
  return (
    // <div className="App">
    <div className='chat'>
      <header className='chatHeader'>
        {/* <header> */}
        <h1 className="chatTitle">Doggo-Chat</h1>
        <SignOut/>

      </header>
      <section>
        {user ? <ChatRoom match = {props.match}/> : <SignIn />}
      </section>

    </div>

  )
}

export default Chat
