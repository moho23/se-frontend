import "@testing-library/jest-dom"
import reducer from '../../redux/map/reducer'
import * as Actions from '../../redux/map/actions'
import {initial_state} from '../../redux/map/reducer'


describe('map reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle EXPAND', () => {
    expect(
      reducer(initial_state, {
        type: Actions.EXPAND,
        expandedKeysValue: ["sport"]
      })
    ).toEqual(
      {
        expandedKeys: ["sport"],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: false,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle CHECK', () => {
    expect(
      reducer(initial_state, {
        type: Actions.CHECK,
        checkedKeysValue: ["natural"]
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: ["natural"],
        selectedKeys: [],
        autoExpandParent: true,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle SELECT', () => {
    expect(
      reducer(initial_state, {
        type: Actions.SELECT,
        selectedKeysValue: ["carwash"]
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: ["carwash"],
        autoExpandParent: true,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle SEARCHAREA', () => {
    expect(
      reducer(initial_state, {
        type: Actions.SEARCHAREA,
        searchareaValue: 2000
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        current: "all",
        searchArea: 2000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle CURRENT', () => {
    expect(
      reducer(initial_state, {
        type: Actions.CURRENT,
        currentValue: 3
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        current: 3,
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle ONSERACH', () => {
    expect(
      reducer(initial_state, {
        type: Actions.ONSERACH,
        searchMarker: <mapir
        coordinates={[50, 50]}
        anchor="bottom"
        style={{cursor: "pointer"}}
        >
        </mapir>
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: <mapir
        coordinates={[50, 50]}
        anchor="bottom"
        style={{cursor: "pointer"}}
        >
        </mapir>,
        modalDetailsShow: false,
    }
    )
  })

  it('should handle MODALDETAILSHOW', () => {
    expect(
      reducer(initial_state, {
        type: Actions.MODALDETAILSHOW,
      })
    ).toEqual(
      {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        current: "all",
        searchArea: 1000,
        searchMarkerArray: null,
        modalDetailsShow: true,
    }
    )
  })
})