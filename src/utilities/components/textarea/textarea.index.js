import React, {useEffect, useRef, useState} from 'react';
import './textarea.style.scss';

const TextArea = (props) => {
    const [text, setText] = useState('');
    const textAreaRef = useRef(null);
    const [status, setStatus] = useState('');

    function onFocusHandler() {
        setStatus('active');
    }

    function onblurHandler() {
        textAreaRef.current?.value.length === 0 ? setStatus('') : setStatus('inputted');
    }

    function onClickHandler() {
        // eslint-disable-next-line no-unused-expressions
        status !== 'active' ? textAreaRef.current.focus() : {};
    }

    const [value, setValue] = useState(props.defaultValue ? props.defaultValue : '');
    useEffect(() => {
        setValue(props.value ? props.value : '');
    }, [props.value]);
    return (
        <div
            onClick={onClickHandler}
            className={`hawdam-textarea  ${props.className} ${status}${props.disabled ? ' disabled' : ''}`}
        >
            {props.label && <label>{props.label}</label>}
            <textarea
                ref={textAreaRef}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onFocus={onFocusHandler}
                onBlur={onblurHandler}
                value={value}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e.target.value);
                }}
            />
            <p className={status === 'error' ? 'active' : ''}>{text}</p>
        </div>
    );
};

export default React.forwardRef(TextArea);
