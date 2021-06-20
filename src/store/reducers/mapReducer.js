const initState = {};

const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case "LATLNG_ADDED":
      console.log(action.latLng + " Latlong added succesfully");
      state.log = action.latLng;
      return state;

    case "LATLGN_ERROR":
      console.log("Latlong error : " + action.err);
      state.log = action.err;
      return state;

    case "LATLNGS_ADDED":
      console.log(action.latLng + " Latlongs added succesfully");
      state.log = action.latLng;
      return state;
    
    case "LATLGNS_ERROR":
      console.log("Latlongs error : " + action.err);
      state.log = action.err;
      return state;

    case "CIRCLE_ADDED":
      console.log("Circle Addedd is" + action.latLng)
      state.log = action.latLng;
      return state;

    case "CIRCLE_ERROR":
      console.log("Circle Error is" + action.err)
      state.log = action.err;
      return state;

    case "ROADBLOCK_ADDED":
      console.log("Roadblock Addedd is" + action.roadblock)
      state.log = action.roadblock;
      return state;
    
    case "ROADBLOCK_DELETED":
      console.log("Roadblock deleted is" + action.roadblockId)
      state.log = action.roadblockId;
      return state;
      
    case "ROADBLOCK_ERROR":
      console.log("Roadblock Error is" + action.err)
      state.log = action.err;
      return state;
      
    case "DISASTER_DELETED":
      console.log("Disaster deleted is" + action.id)
      state.log = action.id;
      return state;

    case "DISASTER_ERROR":
      console.log("Disaster Error is" + action.err)
      state.log = action.err;
      return state;

    case "EVACUATIONPOINT_ADDED":
      console.log("Evacuation Point added is" + action.evacuationPoint)
      state.log = action.evacuationPoint;
      return state;

    case "EVACUATIONPOINT_DELETED":
      console.log("EVACUATIONPOINT deleted")
      state.log = "EVACUATIONPOINT deleted";
      return state;

    case "EVACUATIONPOINT_ERROR":
      console.log("Evacuation Point Error is" + action.err)
      state.log = action.err;
      return state;

    case "MARKER_ADDED":
      console.log("Marker Added is" + action.marker)
      state.log = action.marker;
      return state;

    case "MARKER_DELETED":
      console.log("Marker deleted is" + action.marker)
      state.log = action.marker;
      return state;

    case "MARKER_ERROR":
      console.log("Marker Error is" + action.err)
      state.log = action.err;
      return state;

    
      
    default:
      return state;
  }

};

export default mapReducer;