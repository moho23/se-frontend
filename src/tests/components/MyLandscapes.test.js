import React from "react";
import renderer from 'react-test-renderer'
import MyLandscapes from "../../MainProject/myLandscapes/myLandscapes.index"
import {mount, shallow} from "enzyme";

test('should render MyLandscapes correctly', () => {
    const wrapper = shallow(<MyLandscapes />);
    expect(wrapper).toMatchSnapshot();
  });

test("rendering MyLandscaes component <P> whithout crashing",() =>{
    const wrapper=shallow(<MyLandscapes/>);
    const p =(<p>!متاسفانه مکان ثبت شده ای نداری</p>);
    expect(wrapper.contains(p)).toEqual(true);
})

