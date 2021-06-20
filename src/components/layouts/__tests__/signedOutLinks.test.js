import React from 'react'
import {shallow} from 'enzyme'
import SignedOutLinks from '../SignedOutLinks'


describe('SignedOutLinks component',() =>{

    it('should render the SignedOutLinks component', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null
        }

        const wrapper = shallow(<SignedOutLinks {...props}/>)
        expect(wrapper.find('.right').length).toBe(1)
    })

    it('should contain log in', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null
        }

        const wrapper = shallow(<SignedOutLinks {...props}/>)
        expect(wrapper.find('.logintext').text().includes('Log In')).toBe(true);

    })

    it('should contain Sign Up', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null
        }

        const wrapper = shallow(<SignedOutLinks {...props}/>)
        expect(wrapper.find('.signuptext').text().includes('Sign Up')).toBe(true);

    })
})