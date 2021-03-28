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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
  console.log(snapShot)
  if(!snapShot.exists) {
    // if snapshot doesnt exist - we use the user ref to create a new document - document ref is the only type that can use CRUD functionality
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      // set is the create method 
      await userRef.set({
        displayName, 
        email, 
        createdAt, 
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;