import mapReducer from "../reducers/mapReducer"


describe("Auth Reducer",() =>{

    it('It should return default task',()=>{
        const defaultState = mapReducer({},"")
        expect(defaultState).toEqual({});
    })

    it("It should return latlng that was added",()=>{
        let action = {type: "LATLNG_ADDED", latLng: [[3,4]]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.latLng);
    })

    it("It should return latlng  error",()=>{
        let action = {type: "LATLGN_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })


    it("It should return latlngs that was added",()=>{
        let action = {type: "LATLNGS_ADDED", latLng: [[1,2], [3,4]]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.latLng);
    })


    it("It should return latlngs  error",()=>{
        let action = {type: "LATLGNS_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })



    it("It should return circle latlngs that was added",()=>{
        let action = {type: "CIRCLE_ADDED", latLng: [[1,2], [3,4]]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.latLng);
    })


    it("It should return circle  error",()=>{
        let action = {type: "CIRCLE_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })

    it("It should return Roadblock id that was added",()=>{
        let action = {type: "ROADBLOCK_ADDED", roadblock: "Raodblock2"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.roadblock);
    })


    it("It should return Roadlbock  error",()=>{
        let action = {type: "ROADBLOCK_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })

    it("It should return Roadblock that was Deleted",()=>{
        let action = {type: "ROADBLOCK_DELETED", roadblockId: "Raodblock2"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.roadblockId);
    })

    it("It should return Disaster  error",()=>{
        let action = {type: "DISASTER_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })

    it("It should return Disaster that was Deleted",()=>{
        let action = {type: "DISASTER_DELETED", id: "Raodblock2"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.id);
    })

    it("It should return Evaculation Point that was added",()=>{
        let action = {type: "EVACUATIONPOINT_ADDED", evacuationPoint: [1,2]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.evacuationPoint);
    })


    it("It should return Evaculation Point  error",()=>{
        let action = {type: "EVACUATIONPOINT_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })

    it("It should return log for Evaculation Point that was Deleted",()=>{
        let action = {type: "EVACUATIONPOINT_DELETED"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual("EVACUATIONPOINT deleted");
    })


    it("It should return Marker Point that was added",()=>{
        let action = {type: "MARKER_ADDED", marker: [1,2]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.marker);
    })


    it("It should return Marker Point  error",()=>{
        let action = {type: "MARKER_ERROR", err: "Error"}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.err);
    })

    it("It should return log for Marker Point that was Deleted",()=>{
        let action = {type: "MARKER_DELETED",  marker: [1,2]}
        const defaultState = mapReducer({},action)
        expect(defaultState.log).toEqual(action.marker);
    })

})