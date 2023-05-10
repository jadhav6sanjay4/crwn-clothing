import { useState } from "react";
import { createAuthUserWithEmailAndPasswordd, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"

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
        <div>
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' required name="displayName" onChange={handleInputChange} value={displayName} />

                <label>Email</label>
                <input type='email' required name="email" onChange={handleInputChange} value={email} />

                <label>Password</label>
                <input type='password' required name="password" onChange={handleInputChange} value={password} />

                <label>Confirm Password</label>
                <input type='password' required name="confirmPassword" onChange={handleInputChange} value={confirmPassword} />

                <button type="submit">Sign Up</button>

            </form>
        </div>
    );
}

export default SignUpForm;