import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDsGvA35iHIefhUDJJq3jWsLd08QssbNug",
    authDomain: "modern-react-app-5ee64.firebaseapp.com",
    projectId: "modern-react-app-5ee64",
    storageBucket: "modern-react-app-5ee64.appspot.com",
    messagingSenderId: "727371863945",
    appId: "1:727371863945:web:580ce69b08a3f894ff7358",
    measurementId: "G-8025V643SR"
};

initializeApp(firebaseConfig);
const db=getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()

export {db,auth,provider}
