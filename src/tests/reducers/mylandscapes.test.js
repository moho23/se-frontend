import "@testing-library/jest-dom"
import reducer from '../../redux/myLandscapes/reducer'
import * as Actions from '../../redux/myLandscapes/actions'
import {initial_state} from '../../redux/myLandscapes/reducer'


describe('myLandscapes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        item: null,
        update: false,
    }
    )
  })

  it('should handle ITEM', () => {
    expect(
      reducer(initial_state, {
        type: Actions.ITEM,
        item: {
          name: "kooche",
          kinds: "sport",
          description: "khoobe",
          lat: 50,
          lon:30
        }
      })
    ).toEqual(
      {
        item: {
          name: "kooche",
          kinds: "sport",
          description: "khoobe",
          lat: 50,
          lon:30
        },
        update: false,
    }
    )
  })

  it('should handle UPDATE', () => {
    expect(
      reducer(initial_state, {
        type: Actions.UPDATE,
        bool: true
      })
    ).toEqual(
      {
        item: null,
        update: true,
    }
    )
  })

})