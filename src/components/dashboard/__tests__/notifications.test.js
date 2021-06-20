import React from "react";
import {shallow, mount} from "enzyme";
import Notifications from '../Notifications'
import TestRenderer from 'react-test-renderer';


const setUp = (props = {}) => {
        const component = shallow(<Notifications {...props}/>)
        return component;
}
// it('It should render the paragraph without errors',() =>{
//     const component = shallow(<Notifications/>)
//     console.log(component.debug())
//     const wrapper = component.find('.section')
//     expect(wrapper.length).toBe(1);
// })

describe('Notification Component',()=> {
    let component;
    
    beforeEach(() =>{
        component = setUp();
    }); 

    it('Should render wihout erros',()=>{
        const wrapper = component.find('.notifications');
        expect(wrapper.length).toBe(1);       
    
    })
    
    it('should  not render notifications without props',() => {
        const wrapper = component.find('.pink-text')
        expect(wrapper.length).toBe(0) 
    })

    // it('should render notification when props are passed',() =>{
    //     let props = {notifications:[{id: "iH2DaXmtKrLbOoWd2MaU", user: "Test", content: "test content", time: 't'},]}
    //     const testRenderer = TestRenderer.create(<Notifications {...props}/>)
    //     const testInstance = testRenderer.root;

    //     testInstance.find('.pink-text')

    // })
})