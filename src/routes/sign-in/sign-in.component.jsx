import { signInWithGooglePopup } from "../../utilities/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils";
const SignIn = () => {

    const logGoogleUser = async () => {
       const response = await signInWithGooglePopup();
       console.log(response);
    };

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google PopUp</button>
        </div>
    );
};
export default SignIn;