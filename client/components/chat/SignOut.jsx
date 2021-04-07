import React from 'react'

import firebaseApp from '../../firebase.config'

const auth = firebaseApp.auth()

export default function SignOut () {
  return auth.currentUser && (

    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )
}
