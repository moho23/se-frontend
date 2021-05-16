import React from 'react';
import "./dropDown.style.scss";
import {useLayer} from 'react-laag';

const DropdownSelect = function (props) {
    const [isOpen, setOpen] = React.useState(false);

    function close() {
        setOpen(false);
    }

    const {renderLayer, triggerProps, layerProps, arrowProps} = useLayer({
        isOpen,
        onOutsideClick: close, // close the menu when the user clicks outside
        overflowContainer: true, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: 'bottom-start', // we prefer to place the menu "top-end"
        triggerOffset: 6, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
    });

    function onClickHandler(item: any) {
        close();
        if (props.onChange) props.onChange(item);
    }

    return (
        <div className={`drop-down-select ${props.className ? props.className : ''} `}>
            <div {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {props.children}
            </div>
            {renderLayer(
                <React.Fragment>
                    {isOpen && (
                        <div {...layerProps} className="drop-down-select-menu">
                            {props.options.map((item, index) => (
                                <div key={index} onClick={() => onClickHandler(item)} className="items">
                                    {props.render(item)}
                                </div>
                            ))}
                        </div>
                    )}
                </React.Fragment>,
            )}
        </div>
    );
};

export default DropdownSelect;
