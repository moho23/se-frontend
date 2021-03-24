import React, {useEffect, useState} from 'react';
import "./button.style.scss";

const Button = (props) => {

    const [style, setStyle] = useState('');

    useEffect(() => {
        if (props.disabled) {
            setStyle('disabled');
        } else if (props.type === 'transparent') {
            setStyle('transparent');
        } else {
            setStyle('');
        }
    }, [props.disabled]);

    function onCLickHandler(e) {
        if (props.href || props.submit) {
            e.preventDefault();
        }
        setStyle('clicked');
        if (props.onClick) {
            const promise = props.onClick();
            if (promise) {
                setStyle('loading');
                promise.then(() => {
                    setStyle('');
                });
            }
        }
    }

    if (props.href)
        return (
            <a
                href={props.href}
                className={`project-buttons project-buttons-href ${style} ${props.className ? props.className : ''} `}
            >
                {props.text}
            </a>
        );
    return (
        <button
            onClick={onCLickHandler}
            className={`project-buttons ${style} ${props.className ? props.className : ''} `}
            disabled={style === 'disabled'}
            type={props.submit ? 'submit' : 'button'}
        >
            {style === "loading" ? <i className="cfi cfi-loader"/> : props.text}
        </button>
    )
}
export default Button
