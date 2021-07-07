import React from 'react';
import { createStore } from "redux"
import { Provider } from "react-redux"
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import MyLandscapes from '../../../src/MainProject/myLandscapes/myLandscapes.index';
import { rootReducer } from "../../redux/store"

//???
// const mockChildComponent = jest.fn();
// jest.mock("../../MainProject/myLandscapes/myLandscapes.index", () => (props) => {
//     mockChildComponent(props);
//     return <mock-childComponent />;
// });

function renderWithRedux(component, { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

describe('myLandscapes reducer', () => {
    it("Renders <myLandscapes /> component correctly", () => {
        renderWithRedux(<MyLandscapes />, {
            initialState: {
                mylandscapes: {
                    item: null,
                    update: false,
                }
            }
        });


    })
})