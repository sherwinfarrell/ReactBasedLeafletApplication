import {GetRailData, GetDisasterCoords, GetBusCoords, GetEpiCentreCoords, reverseCoord, fireSatus, evacuationSatus} from '../Util'


describe('Get Rail Data Function',() =>{

    it('empyty list test', () =>{
       let  props1 = { railData: []}
        console.log(GetRailData(props1))
        let result = GetRailData(props1);
        console.log(result)
        expect([]).toEqual(expect.arrayContaining(result));

    }),

    it("Size of list Testing", ()=>{
        
        let railData = {0: {'stations':{}}, 1: {'trains': {32: {'latitude': "53.5741", 'longitude': "-6.11933"}, 43: {'latitude': "53.5741", 'longitude': "-6.11933"}}}}
        let props1 = {railData: railData}

        console.log(GetRailData(props1))
        let result = GetRailData(props1);
        console.log("Rail data not empty ") 
        console.log("The result is" + result)
        expect(result).not.toEqual([])

    })



})

describe('Disaster Coordinates Function testing', () => {

    it('empty list test',() =>{
        let  props1 = { disasters: []}
        console.log(GetDisasterCoords(props1))
        let result = GetDisasterCoords(props1);
        console.log(result)
        expect([]).toEqual(expect.arrayContaining(result));
    }),

    it("Size of list Testing", ()=>{
        let polygon1 = "{\"type\": \"Polygon\", \"coordinates\": [[[53.35429488601468, -6.250740667487683], [53.35546293900717, -6.2510670689793315], [53.356504442330284, -6.2520112641747705], [53.35730652000832, -6.253470963193385], [53.3577822390845, -6.255287980730666], [53.357880036649185, -6.257265379685946], [53.35758931227581, -6.259188827139012], [53.356941577814425, -6.260849842186892], [53.35600703949178, -6.2620684072882264], [53.35488698400983, -6.262712484722673], [53.35370279624463, -6.262712319558467], [53.35258280131224, -6.262067981448488], [53.351648358553796, -6.26084933525632], [53.351000714370024, -6.25918845289985], [53.350710036915906, -6.257265295961956], [53.35080781825474, -6.255288222829843], [53.3512834648027, -6.2534714290179085], [53.35208544423668, -6.252011757277597], [53.3531268650313, -6.251067381409639], [53.35429488601468, -6.250740667487683]]]}"

        let disasters = {0: {'polygon': polygon1, individualsInDisaster:{individuals: {p1: false, p0: false}, totalIndividuals: 5}}}
        let props1 = {disasters: disasters}

        console.log(GetDisasterCoords(props1))
        let result = GetDisasterCoords(props1);
        console.log("Rail data not empty ") 
        console.log("The result is" + result)
        expect(result).not.toEqual([])

    })
})

describe('Bus Coordinates Function testing', () => {

    it('empty list test',() =>{
        let  props1 = { busData: []}
        console.log(GetBusCoords(props1))
        let result = GetBusCoords(props1);
        console.log(result)
        expect([]).toEqual(expect.arrayContaining(result));
    })

    it("Size of list Testing", ()=>{

        let busData = {0: {'1498443-4-10-2-e20-1-1-O': {latitude: "52.8009569019829", longitude: "-6.14801309538182"}}}
        let props1 = {busData: busData}

        console.log(GetBusCoords(props1))
        let result = GetBusCoords(props1);
        console.log("Bus data not empty ") 
        console.log("The result is" + result)
        expect(result).not.toEqual([])

    })


})

describe('Epicentre Coordinates Function testing', () => {

    it('empty list test',() =>{
        let  props1 = { disasters: []}
        console.log(GetEpiCentreCoords(props1))
        let result = GetEpiCentreCoords(props1);
        console.log(result)
        expect([]).toEqual(expect.arrayContaining(result));
    })

    it("Size of list Testing", ()=>{

        let polygon1 = "{\"type\": \"Polygon\", \"coordinates\": [[[53.35429488601468, -6.250740667487683], [53.35546293900717, -6.2510670689793315], [53.356504442330284, -6.2520112641747705], [53.35730652000832, -6.253470963193385], [53.3577822390845, -6.255287980730666], [53.357880036649185, -6.257265379685946], [53.35758931227581, -6.259188827139012], [53.356941577814425, -6.260849842186892], [53.35600703949178, -6.2620684072882264], [53.35488698400983, -6.262712484722673], [53.35370279624463, -6.262712319558467], [53.35258280131224, -6.262067981448488], [53.351648358553796, -6.26084933525632], [53.351000714370024, -6.25918845289985], [53.350710036915906, -6.257265295961956], [53.35080781825474, -6.255288222829843], [53.3512834648027, -6.2534714290179085], [53.35208544423668, -6.252011757277597], [53.3531268650313, -6.251067381409639], [53.35429488601468, -6.250740667487683]]]}"

        let disasters = {0: {'polygon': polygon1, epicentre: {epicentre: {t: {x_: 53.35429503781774, N_: -6.256767634802561}}}, individualsInDisaster:{individuals: {p1: false, p0: false}, totalIndividuals: 5}}}
        let props1 = {disasters: disasters}

        console.log(GetEpiCentreCoords(props1))
        let result = GetEpiCentreCoords(props1);
        console.log("Bus data not empty ") 
        console.log("The result is" + result)
        expect(result).not.toEqual([])

    })
})


describe('Testing suite for reverse coordinates function', () =>{

    it("Empty List testing", ()=>{
        let result = reverseCoord([])
        expect([]).toEqual(expect.arrayContaining(result));

    })

    
    it(" Non Empty List testing", ()=>{
        let result = reverseCoord([[1,2],[1,2]])

        console.log(result)
        expect(result).toEqual([ [ 2, 1 ], [ 2, 1 ] ])

    })
})


describe('Testing suite for Evacuation status function function', () =>{

    it("Empty List testing", ()=>{
        let result = evacuationSatus("")
        expect(result).toEqual("Pending");

    })

    
    it(" Testing for True as input", ()=>{
        let result = evacuationSatus(true)

        expect(result).toEqual("Done")

    })

    it(" Testing for False as input", ()=>{
        let result = evacuationSatus(false)

        expect(result).toEqual("Pending")

    })
})


describe('Testing suite for Fire status function function', () =>{

    it("Empty List testing", ()=>{
        let result = fireSatus("")
        expect(result).toEqual("Pending");

    })

    
    it(" Testing for True as input", ()=>{
        let result = fireSatus(true)

        expect(result).toEqual("Pending")

    })

    it(" Testing for False as input", ()=>{
        let result = fireSatus(false)

        expect(result).toEqual("Done")

    })
})