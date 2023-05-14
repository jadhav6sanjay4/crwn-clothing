import './form-input.styles.scss';

const FromInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {/* If lable of field is present then only render the label input */}
            {label && (
                // If User is enter something or not in input field if yes 'shrink' or form-input-lable 
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    );
}

export default FromInput;