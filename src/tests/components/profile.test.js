import React from 'react';
import {createStore} from "redux"
import {Provider} from "react-redux"
import { render as rtlRender,fireEvent,screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import Profile from '../../../src/MainProject/profile/profile.index';
import reducer from '../../redux/register/reducer'
import * as Actions from '../../redux/register/actions'
import {initial_state} from '../../redux/register/reducer'
import {rootReducer} from "../../redux/store"


const mockChildComponent = jest.fn();
jest.mock("../../utilities/components/input/input.index", () => (props) => {
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
    // console.log(mockChildComponent.mock.calls)
    mockChildComponent.mock.calls.map((e)=>{
      if(e[0].label==="نام کاربری"){
        expect(e[0].value).toEqual("YazdanSeyyedi")
      }
      else if(e[0].label==="نام"){
        expect(e[0].value).toEqual("Yazdan")
      }
      else if(e[0].label==="نام خانوادگی"){
        expect(e[0].value).toEqual("Seyyedi")
      }
      else if(e[0].label==="ایمیل"){
        expect(e[0].value).toEqual("y@gmail.com")
      }
    })
    
  })
})