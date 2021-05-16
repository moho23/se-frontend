import './dropDown.style.scss';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import useOnBlur from '../../../scripts/useOnBlur';
import {OverlayTrigger} from 'react-bootstrap';

const Dropdown = function (props, ref) {
    const [selected, setSelected] = useState();
    const [error, setError] = useState();
    const [isOpen, setOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState();
    const dropRef = useRef(null);

    function close() {
        setOpen(false);
    }

    useImperativeHandle(ref, () => ({
        setError: (text) => setError(text),
        setValue: (e) => setSelected(e),
        getValue: () => selected,
    }));

    useEffect(() => {
        setSelected(props.value);
    }, [props.value]);

    function onSelectHandler(e) {
        setSelected(e);
        setOpen(false);
        setError(undefined);
        if (props.onChange) props.onChange(e);
    }

    useOnBlur(dropRef, () => setOpen(false));

    useEffect(() => {
        if (isOpen) setMenuWidth(dropRef.current?.clientWidth.toString());
    }, [isOpen]);

    return (
        <div
            ref={dropRef}
            className={`project-drop-down ${isOpen ? 'active' : ''} ${props.className ? props.className : ''}`}
        >
            <span className="d-flex">
                {props.label && <label className="label" style={{color: props.labelColor}}> {props.label} </label>}
            </span>
            <OverlayTrigger
                show={isOpen}
                container={dropRef.current}
                overlay={
                    <div className={`dropdown-menu `} style={{width: menuWidth + 'px'}}>
                        {props.firstAction && (
                            <div
                                onClick={() => {
                                    onSelectHandler(props.firstAction);
                                }}
                                className="dropdown-items"
                            >
                                <span className="dropdown-item first-item" style={{color: props.color}}>
                                    {props.firstAction.title}
                                </span>
                                {props.firstAction.icon && <i className={props.firstAction.icon}></i>}
                            </div>
                        )}
                        {props.options.map((item, index) => (
                            <div
                                onClick={() => {
                                    onSelectHandler(item);
                                }}
                                key={index}
                                className="dropdown-items"
                            >
                                <span className="dropdown-item" style={{color: props.color}}>
                                    {item.title}
                                </span>
                                {item.icon && <i className={item.icon}></i>}
                            </div>
                        ))}
                        {props.lastAction && (
                            <div
                                onClick={() => {
                                    onSelectHandler(props.lastAction);
                                }}
                            >
                                <span className="dropdown-item last-item" style={{color: props.color}}>
                                    {props.lastAction.title}
                                </span>
                                {props.lastAction.icon && <i className={props.lastAction.icon}></i>}
                            </div>
                        )}
                    </div>
                }
                placement="bottom-end"
            >
                <div onClick={() => setOpen(true)} className={`dropdown-box ${props.className ? props.className : ''}`}>
                    <span className={selected ? '' : 'dropdown-PH'}>
                        {selected ? selected.title : props.placeholder}
                    </span>
                    <i className="ufi ufi-chevron-down"/>
                </div>
            </OverlayTrigger>
            {error && <p className="input-error">{error}</p>}
        </div>
    );
};

export default React.forwardRef(Dropdown);
