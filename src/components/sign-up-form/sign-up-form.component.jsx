import { useState } from "react";

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
};

const SignUpForm = () => {
    

    const [formFields,setFormFields] =  useState(defaultFormFields);//set default value for formField from defaultFormFields
    const{ displayName,email,password,confirmPassword } = formFields;
    console.log(formFields);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value});
    };

    return (
        <div>
        <h1>Sign Up Form</h1>
        <form  onSubmit={() => {}}>
            <label>Display Name</label>
            <input type='text' required name="displayName" onChange={handleInputChange} value={displayName}/>

            <label>Email</label>
            <input type='email' required name="email" onChange={handleInputChange} value={email}/>

            <label>Password</label>
            <input type='password' required name="password" onChange={handleInputChange} value={password}/>

            <label>Confirm Password</label>
            <input type='password' required name="confirmPassword" onChange={handleInputChange} value={confirmPassword}/>

            <button type="submit">Sign Up</button>

        </form>
        </div>
    );
}

export default SignUpForm;