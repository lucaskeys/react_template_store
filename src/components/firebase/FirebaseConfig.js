import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBOGYlGjT_PewQGd5E4F_K8NvcxdCFSWy4",
  authDomain: "crwn-db-679c5.firebaseapp.com",
  projectId: "crwn-db-679c5",
  storageBucket: "crwn-db-679c5.appspot.com",
  messagingSenderId: "942699657184",
  appId: "1:942699657184:web:af29c5a1f61ef742195d85"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;