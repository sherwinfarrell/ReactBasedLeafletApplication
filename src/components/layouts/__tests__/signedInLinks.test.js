import React from 'react'
import {shallow} from 'enzyme'
import {SignedIn} from '../SignedInLinks'


describe('SignedInLinks component',() =>{

    it('should render the SignedInLinks component', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignedIn {...props}/>)
        expect(wrapper.find('.right').length).toBe(1)
    })

    it('should contain the Initialas', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignedIn {...props}/>)
        // expect(wrapper.find('.pinklighten-1').length).toBe(1)
        expect(wrapper.find('.pinklighten-1').text().includes('SH')).toBe(true);

    })


    it('should contain the log out  text in SignedOutLinks Component', () =>{
        const props = {
            auth: {
                uid: 12
            },
            authError: null,
            profile: {
                initials: "SH"
            }
            
        }

        const wrapper = shallow(<SignedIn {...props}/>)
        // expect(wrapper.find('.pinklighten-1').length).toBe(1)
        expect(wrapper.find('.logouttext').text().includes('Log Out')).toBe(true);

    })
})