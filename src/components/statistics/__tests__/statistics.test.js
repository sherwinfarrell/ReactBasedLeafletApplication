import React from 'react'
import {shallow} from 'enzyme'
import {Statistics} from '../Statistics'


describe('Satistics component',() =>{

    it('should render the Satistics component', () =>{
  

        let disasters = [{0:{id: "disaster1", reroutedBuses:
        {
        busRoute0: "1",
        busRoute1: "2",
        busRoute2: "3",
        busRoute3: "4",
        busRoute4: "5"}, roadblocks: {
                roadblock0: {active: false, location: Array(2)},
                roadblock1: {active: false, location: Array(2)},
                roadblock2: {active: false, location: Array(2)},
                roadblock3: {location: Array(2), active: false}
        }, individualsInDisaster: {individuals: {}, totalIndividuals: 5}}}]

        const props = {
            auth: {
                uid: 123
            },
            authError: null, 
            disasters: disasters
        }

        const wrapper = shallow(<Statistics {...props}/>)
        expect(wrapper.find('.person-chart').length).toBe(1)
    })


    it('should render the roadblocks-chart component', () =>{
  

        let disasters = [{0:{id: "disaster1", reroutedBuses:
        {
        busRoute0: "1",
        busRoute1: "2",
        busRoute2: "3",
        busRoute3: "4",
        busRoute4: "5"}, roadblocks: {
                roadblock0: {active: false, location: Array(2)},
                roadblock1: {active: false, location: Array(2)},
                roadblock2: {active: false, location: Array(2)},
                roadblock3: {location: Array(2), active: false}
        }, individualsInDisaster: {individuals: {}, totalIndividuals: 5}}}]

        const props = {
            auth: {
                uid: 123
            },
            authError: null, 
            disasters: disasters
        }

        const wrapper = shallow(<Statistics {...props}/>)
        expect(wrapper.find('.roadblocks-chart').length).toBe(1)
    })

    it('should render the buses-chart component', () =>{
  

        let disasters = [{0:{id: "disaster1", reroutedBuses:
        {
        busRoute0: "1",
        busRoute1: "2",
        busRoute2: "3",
        busRoute3: "4",
        busRoute4: "5"}, roadblocks: {
                roadblock0: {active: false, location: Array(2)},
                roadblock1: {active: false, location: Array(2)},
                roadblock2: {active: false, location: Array(2)},
                roadblock3: {location: Array(2), active: false}
        }, individualsInDisaster: {individuals: {}, totalIndividuals: 5}}}]

        const props = {
            auth: {
                uid: 123
            },
            authError: null, 
            disasters: disasters
        }

        const wrapper = shallow(<Statistics {...props}/>)
        expect(wrapper.find('.buses-chart').length).toBe(1)
    })
})