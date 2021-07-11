import "@testing-library/jest-dom"
import reducer from '../../redux/register/reducer'
import * as Actions from '../../redux/register/actions'
import {initial_state} from '../../redux/register/reducer'


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

  it('should handle AUTH_STATUS', () => {
    expect(
      reducer(initial_state, {
        type: Actions.AUTH_STATUS,
        payload: "done"
      })
    ).toEqual(
      {
        userData: null,
        authStatus: "done"
      }
    )
  })
})