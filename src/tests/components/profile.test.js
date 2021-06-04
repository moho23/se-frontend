import React from 'react';
import {createStore} from "redux"
import {Provider} from "react-redux"
import { render as rtlRender,fireEvent,screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import Profile from '../../../src/MainProject/profile/profile.index';
// import Diver from '../../../src/MainProject/driverTravels/driverTravels.index';
import reducer from '../../redux/register/reducer'
import * as Actions from '../../redux/register/actions'
import {initial_state} from '../../redux/register/reducer'
import {rootReducer} from "../../redux/store"
// import Input from "../../utilities/components/input/input.index"


// jest.mock("../../utilities/components/input/input.index",()=>()=><div data-testid="Inputusername" />)
// jest.mock("../../utilities/components/input/input.index", () => ({
//   Inputusername: jest.fn(() => (
//     <div data-testid="Inputusername" />
//   ))
// }))
// jest.mock("../../utilities/components/input/input.index", () => ({
//   Inputusername: jest.fn(({ children }) => (
//     <div data-testid="Inputusername">{children}</div>
//   ))
// }))

const mockChildComponent = jest.fn();
jest.mock("../../utilities/components/input/input.index", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});


// jest.mock("../../utilities/components/input/input.index", () => {
//   return function Inputusername({ children }) {
//     return (
//       <div data-testid="Inputusername">
//         { children }
//       </div>
//     );
//   };
// });
// jest.mock("../../utilities/components/input/input.index", () => ((({ children }) => (
//     <div data-testid="Inputusername">{children}</div>
//   ))
// ))
// jest.mock("../../utilities/components/input/input.index", () => (jest.fn(({ children }) => (<div data-testid="Inputusername">{children}</div>))))

function renderWithRedux(component,{initialState,store = createStore(rootReducer, initialState),...renderOptions} = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

// describe("<Profile />", () => {
//   it("Renders <Profile /> component correctly", () => {
//     const {getByTestId } = rtlRender(<Diver />);
//     expect(getByTestId("email")).toHaveTextContent("y.seyyedi")
//   });
// });

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        userData: null,
        authStatus: "pending",
      }
    )
  })

  it('should handle USER_DATA', () => {
    expect(
      reducer(initial_state, {
        type: Actions.USER_DATA,
        payload: {
          firstname:"Yazdan",
          lastname:"Seyyedi",
          email:"y@gmail.com",
          username:"Yazdan",
          city:"Tehran",
          profile_picture:""
        }
      })
    ).toEqual(
      {
        userData: {
          firstname:"Yazdan",
          lastname:"Seyyedi",
          email:"y@gmail.com",
          username:"Yazdan",
          city:"Tehran",
          profile_picture:""
        },
        authStatus: "pending"
      }
    )
  })


  it("Renders <Profile /> component correctly", () => {
    renderWithRedux(<Profile />,{initialState: {register:{
      userData: {
        firstname:"Yazdan",
        lastname:"Seyyedi",
        email:"y@gmail.com",
        username:"YazdanSeyyedi",
        city:"Tehran",
        profile_picture:""
      },
      authStatus: "pending"
    }
    
  }
      });
    // expect(screen.getByTestId(/input-username/i)).toHaveValue("YazdanSeyyedi")
    // expect(screen.getAllByTestId("Inputusername")[0]).toBeInTheDocument()
    // console.log(screen.getAllByTestId("Inputusername")[0].getAttribute("data-testid"))
    // expect(screen.getAllByTestId("Inputusername")[0].getAttribute("value")).toEqual("YazdanSeyyedi")
    // expect(Inputusername(Input).getAttribute("value")).toEqual("YazdanSeyyedi")
    // expect(Inputusername).toHaveBeenCalledWith(expect.objectContaining({value:"YazdanSeyyedi"}),expect.anything())
    // expect(
    //   screen.getAllByTestId('[data-testid="site"]').getAttribute("href")
    // ).toEqual("http://test.com");
    // console.log(mockChildComponent)
    // expect(mockChildComponent).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     value: "true",
    //   })
    // )
    // console.log(expect(mockChildComponent).toHaveBeenCalledWith())
    // expect(mockChildComponent).toHaveBeenCalledWith()[1].objectContaining({
    //     value: "true",
    //   })

    console.log(mockChildComponent.mock.calls)
    mockChildComponent.mock.calls.map((e)=>{
      if(e[0].label==="نام کاربری"){
        expect(mockChildComponent.mock.calls[0][0].value).toEqual("YazdanSeyyedi")
      }
    })
    // expect(mockChildComponent.mock.calls[0][0].value).toEqual("YazdanSeyyedi")
    // expect(mockChildComponent).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     value: true,
    //   })
    // );
      
  })
})