import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseAPI = {
  apiKey: 'AIzaSyDpXEG3Mmn1_iMlWLQKa93esqw-WlL1d_I',
  authDomain: 'dog-tinder-chat.firebaseapp.com',
  projectId: 'dog-tinder-chat',
  storageBucket: 'dog-tinder-chat.appspot.com',
  messagingSenderId: '201839998608',
  appId: '1:201839998608:web:64ff3525b2e8a34bf84a15',
  measurementId: 'G-05W5GQ03NJ'
}

const firebaseApp = firebase.initializeApp(firebaseAPI)

export default firebaseApp
