// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'firebase/auth';
import { getDoc, setDoc, doc, getFirestore } from 'firebase/firestore';
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firerbaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//create DB in Firebase
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    //Authentication
    if (!userAuth) return;//If we dont get user auth return

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdDate = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createdDate, ...additionalInformation });
        } catch (error) {
            console.log("Error while creating user DOC :", error.message);
        }

    }
    return userDocRef;
};
export const createAuthUserWithEmailAndPasswordd = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
export const userSignInWithEmailAndPassword = async (email, password) => {
    console.log("EMAIL:=>" + email + "PASSWORD:=>" + password + "AUTH:=>" + auth);
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};