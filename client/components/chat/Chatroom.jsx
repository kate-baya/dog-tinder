import React, { useRef, useState } from 'react'
import { getDecodedToken } from 'authenticare/client'

import firebase from 'firebase/app'
import firebaseApp from '../../firebase.config'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import ChatMessage from './ChatMessage'
import Footer from '../Footer'

const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()

function getChatIDFromParams (props) {
  const matchId = props.match.params.matchId
  const myId = getDecodedToken().id

  if (matchId > myId) {
    return myId + '-' + matchId
  } else {
    return matchId + '-' + myId
  }
}

export default function ChatRoom (props) {
  const chatId = getChatIDFromParams(props)

  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.where('chatId', '==', chatId).orderBy('createdAt').limit(25)

  const [messages, loading, error] = useCollectionData(query)
  console.log(messages, loading, error)

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid } = auth.currentUser

    const photoURL = getDecodedToken().image

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      chatId
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* <main> */}
      <main className='chatbox'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input className='messageForm' value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit' className="sendButton">🔼</button>
      </form>
      <Footer />
    </>

  )
}
