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
  const collectionRef = firestore.collection('users')
  
  // this will get the snapshot object of the user
  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get()
  console.log({collection: collectionSnapshot.docs.map(doc => doc.data() )})
  
  if(!snapShot.exists) {

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


// converting our data to be ready for database migration
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // loops through the array and batches the calls together 
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    // this will create a new document reference and generate a new id in firestore - make a new doc referebce object for each collection 
    const newDocRef = collectionRef.doc()
    console.log(newDocRef)
    batch.set(newDocRef, obj)
  })

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      // encodeURI comes with js renderer - pass a string 
      routeName: encodeURI(title.toLowerCase()),
      // id is part of the doc object
      id: doc.id,
      title: title,
      items: items
    }
  })


  console.log(transformedCollection)


  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator;
  }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// we are going to import our new googleProvider const inside of our user.sagas
export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;