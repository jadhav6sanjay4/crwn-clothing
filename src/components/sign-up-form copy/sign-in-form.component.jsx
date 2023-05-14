import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, userSignInWithEmailAndPassword } from "../../utilities/firebase/firebase.utils"
import Button from "../button/button.component";
import FromInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);//set default value for formField from defaultFormFields
    const { email, password } = formFields;
    console.log(formFields);

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        createUserDocumentFromAuth(response);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();//Prevent all defaults of form
        try {
            const response = await userSignInWithEmailAndPassword(email, password);
            console.log("response", response);
            resetForm();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('Incorrect email !!!');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for email !!!');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FromInput label="Email" type='email' required name="email" onChange={handleInputChange} value={email} />
                <FromInput label="Password" type='password' required name="password" onChange={handleInputChange} value={password} />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={logGoogleUser} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;