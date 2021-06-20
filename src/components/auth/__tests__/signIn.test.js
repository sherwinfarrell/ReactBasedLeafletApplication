import React from 'react'
import {shallow} from 'enzyme'
import {SignIn} from '../SignIn'


describe('SginIn component',() =>{

    it('should render the signin component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null
        }

        const wrapper = shallow(<SignIn {...props}/>)
        expect(wrapper.find('.container').length).toBe(1) 
    })


    it('should contain signin in the component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null
        }

        const wrapper = shallow(<SignIn {...props}/>)
        expect(wrapper.find('.signintext').text().includes("Sign In")).toBe(true);
    })


    it('should contain Email in the component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null
        }

        const wrapper = shallow(<SignIn {...props}/>)
        expect(wrapper.find('.emailtext').text().includes("Email")).toBe(true);
    })

    it('should contain Password in the component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null
        }

        const wrapper = shallow(<SignIn {...props}/>)
        expect(wrapper.find('.passwordtext').text().includes("Password")).toBe(true);
    })

    it('should contain Login in the component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null
        }

        const wrapper = shallow(<SignIn {...props}/>)
        expect(wrapper.find('.lighten-1z-depth-0').text().includes("Login")).toBe(true);
    })


})