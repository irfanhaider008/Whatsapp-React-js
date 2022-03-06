import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/database"


const firebaseConfig = {
  apiKey: "AIzaSyCnXb4ew2JidIRmdnb5iSCZ4VqpixTARKw",
  authDomain: "whatsapp-firebase-a396d.firebaseapp.com",
  projectId: "whatsapp-firebase-a396d",
  storageBucket: "whatsapp-firebase-a396d.appspot.com",
  messagingSenderId: "150987856423",
  appId: "1:150987856423:web:c2888f62a02a28b30ecc02"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage =firebase.storage();

export { auth,provider,storage};
export default db;
