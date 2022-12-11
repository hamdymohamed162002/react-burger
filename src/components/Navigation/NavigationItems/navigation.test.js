import { configure,shallow } from "enzyme";
import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

configure({adapter:new Adapter()});
describe('<Navigation/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>)
    })
    it('should',()=>{
      
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should',()=>{
      wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
}
)