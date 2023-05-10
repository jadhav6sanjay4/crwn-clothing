import { useState } from "react";
import { createAuthUserWithEmailAndPasswordd, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"
import Button from "../button/button.component";
import FromInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);//set default value for formField from defaultFormFields
    const { displayName, email, password, confirmPassword } = formFields;
    console.log(formFields);

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();//Prevent all defaults of form
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPasswordd(email, password);
            console.log("user:=>" + JSON.stringify(user));
            console.log("Display Name :=>" + displayName);
            await createUserDocumentFromAuth(user, { displayName });
            resetForm();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This email entered alerady used.');
            }
            console.log("Error encountered while create user", error);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FromInput label="Display Name" type='text' required name="displayName" onChange={handleInputChange} value={displayName} />
                <FromInput label="Email" type='email' required name="email" onChange={handleInputChange} value={email} />
                <FromInput label="Password" type='password' required name="password" onChange={handleInputChange} value={password} />
                <FromInput label="Confirm Password" type='password' required name="confirmPassword" onChange={handleInputChange} value={confirmPassword} />
                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    );
}

export default SignUpForm;