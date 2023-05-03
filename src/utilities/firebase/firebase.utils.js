// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDoc, setDoc, doc, getFirestore } from 'firebase/firestore';
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaezrPmbKwwqX5Hef1aLz-irvV6TeUhRc",
    authDomain: "crwn-clothing-db-e1648.firebaseapp.com",
    projectId: "crwn-clothing-db-e1648",
    storageBucket: "crwn-clothing-db-e1648.appspot.com",
    messagingSenderId: "411334024058",
    appId: "1:411334024058:web:679d03150f13a74bb3d4c3"
};

// Initialize Firebase
const firerbaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firerbaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//create DB in Firebase
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
};