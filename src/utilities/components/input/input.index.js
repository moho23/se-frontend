import React, {useEffect, useRef, useState} from 'react';
import './input.style.scss';

const Input = (props, ref) => {
    React.useImperativeHandle(ref, () => ({
        getValue: () => inputRef.current.value,
        setValue: (e) => setValue(e),
        setError: (text) => {
            setText(text);
            setStatus('error');
            inputRef.current.value = '';
        },
    }));

    const [text, setText] = useState('');
    const inputRef = useRef(null);
    const [status, setStatus] = useState('');
    const [value, setValue] = useState(props.defaultValue ? props.defaultValue : '');
    useEffect(() => {
        setValue(props.value ? props.value : '');
    }, [props.value]);

    function onFocusHandler() {
        setStatus('active');
    }

    function onblurHandler() {
        inputRef.current?.value.length === 0 ? setStatus('') : setStatus('inputted');
    }

    function onChangeHandler(e) {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
    }

    return (
        <div
            className={`project-input  ${props.className} ${status}${props.disabled ? ' disabled' : ''}`}
        >
            {props.label && <label>{props.label}</label>}
            <input
                ref={inputRef}
                autoComplete="new-password"
                type={props.type}
                value={value}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onFocus={onFocusHandler}
                onBlur={onblurHandler}
                onChange={onChangeHandler}
            />
            <p className={status === 'error' ? 'active' : ''}>{text}</p>
        </div>
    );
};

export default React.forwardRef(Input);
