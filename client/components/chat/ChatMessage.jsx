import React from 'react'

import firebaseApp from '../../firebase.config'

const auth = firebaseApp.auth()

export default function ChatMessage (props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'send' : 'received'

  return (
    <div className="chatAlign">
      <div className={`message ${messageClass}`}>
        {/* <img src={photoURL}/>
      <p>{text}</p> */}
        <img className='imgChat' src={photoURL}/>
        <p className='chatP'>{text}</p>
        {/* <p className='chatText chatP'>{text}</p>  */}
      </div>
    </div>
  )
}
