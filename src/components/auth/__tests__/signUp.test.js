import React from 'react'
import {shallow} from 'enzyme'
import {SignUp} from '../SignUp'


describe('SignUp component',() =>{

    it('should render the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.container').length).toBe(1)
    })

    it('should contain the text First Name in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.firstnametext').text().includes('First Name')).toBe(true);
    })


    it('should contain Last Name in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.lastnametext').text().includes('Last Name')).toBe(true);
    })

    it('should contain Email in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.emailtext').text().includes('Email')).toBe(true);
    })


    it('should contain Password in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.passwordtext').text().includes('Password')).toBe(true);
    })


    it('should contain Sign Up in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.lighten-1').text().includes("Sign Up")).toBe(true);
    })


    it('should contain null in the SignUp component', () =>{
        const props = {
            auth: {
                uid: null
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignUp {...props}/>)
        expect(wrapper.find('.red-text')).toBeNull;
    })
})