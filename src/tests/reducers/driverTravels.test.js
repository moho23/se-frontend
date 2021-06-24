import "@testing-library/jest-dom"
import reducer from '../../redux/driverTravels/reducer'
import * as Actions from '../../redux/driverTravels/actions'
import {initial_state} from '../../redux/driverTravels/reducer'


describe('driverTravels reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        item: null,
        driverModalShow: false,
        isupdate:false
    }
    )
  })

  it('should handle ITEM', () => {
    expect(
      reducer(initial_state, {
        type: Actions.ITEM,
        item: {
          time: "05:42:25",
          count: 5,
          date:"2021/21/02",
          source:"Tehran",
          destination:"Ardabil",
        }
      })
    ).toEqual(
      {
        item: {
          time: "05:42:25",
          count: 5,
          date:"2021/21/02",
          source:"Tehran",
          destination:"Ardabil",
        },
        driverModalShow: false,
        isupdate:false
    }
    )
  })

  it('should handle DRIVERMODALSHOW', () => {
    expect(
      reducer(initial_state, {
        type: Actions.DRIVERMODALSHOW,
        isopen: true
      })
    ).toEqual(
      {
        item: null,
        driverModalShow: true,
        isupdate:false
    }
    )
  })

  it('should handle ISUPDATE', () => {
    expect(
      reducer(initial_state, {
        type: Actions.ISUPDATE,
        isupdate: true
      })
    ).toEqual(
      {
        item: null,
        driverModalShow: false,
        isupdate:true
    }
    )
  })

})