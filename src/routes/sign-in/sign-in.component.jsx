import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils";
const SignIn = () => {

    const logGoogleUser = async () => {
       const response = await signInWithGooglePopup();
       createUserDocumentFromAuth(response);
    };

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google PopUp</button>
            <SignUpForm/>
        </div>
    );
};
export default SignIn;