function Input({
    value,
    className,
    placeholder,
    id
}) {
    return (
        <input
            id={id}
            className={`input-field ${className}`} 
            value={value}
            placeholder={placeholder}
        ></input>
    )
}

export default Input;