import React from 'react';
import {createStore} from "redux"
import {Provider} from "react-redux"
import { render as rtlRender,fireEvent,screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import DriverTravels from '../../../src/MainProject/driverTravels/driverTravels.index';
import {rootReducer} from "../../redux/store"

const mockChildComponent = jest.fn();
jest.mock("../../MainProject/DriverModal/drivermodal.index", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

function renderWithRedux(component,{initialState,store = createStore(rootReducer, initialState),...renderOptions} = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}


describe('driverTravels reducer', () => {


    it("Renders <driverTravels /> component correctly", () => {
      renderWithRedux(<DriverTravels />,{initialState: {driverTravels:{
        item: null,
        driverModalShow: true,
        isupdate:false
      }
    }
        });  
        
    expect(screen.getByTestId("test")).toBeInTheDocument()
    console.log(mockChildComponent.mock.calls)
    console.log(mockChildComponent.mock.calls)
    expect(mockChildComponent.mock.calls.length).toEqual(1)
    })
  })