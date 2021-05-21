import React from "react";
import Signup from "../../MainProject/register/signup/signup.index"
import {mount, shallow} from "enzyme";

test('should render Signup correctly', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });


test("rendering Signup component <P1> whithout crashing",() =>{
    const wrapper=shallow(<Signup/>);
    const p1 =(<p>خوش اومدی :)</p>);
    expect(wrapper.contains(p1)).toEqual(true);
})