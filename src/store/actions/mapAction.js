import { personIcon, roadblockIcon, ambulanceIcon, hospitalIcon, policecarIcon,firetruckIcon, busIcon, carIcon, trainIcon } from "../../components/Mapping/ImageUtil";


  
  export const addLatLng = (latLng) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        firebase.ref("emergency_coordinator/pois/poi1").push(latLng).then(() => {
            dispatch({ type: "LATLNG_ADDED", latLng });
          })
          .catch(err => {
            dispatch({ type: "LATLGN_ERROR", err });
          });
  
    }
};

export const addLatLngs = (latLng, addCount) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
      const firestore = getFirestore();
      const firebase = getFirebase();
      let key = 'zone'+ addCount;
      firebase.ref("emergency_coordinator/disaster/rectangle").push( JSON.stringify(latLng)).then(() => {
          dispatch({ type: "LATLNGS_ADDED", latLng });
        })
        .catch(err => {
          dispatch({ type: "LATLGNS_ERROR", err });
        });

  }
};

export const addCircle = (latLng, radius, addCount) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    let coordinates  = {"lat": latLng.lat, "lng": latLng.lng, "radius": radius, "status": "Active" }
    let key = 'zone'+ addCount;
    firebase.ref("emergency_coordinator/disaster/circle/").push( JSON.stringify(coordinates)).then(() => {
          dispatch({ type: "CIRCLE_ADDED", latLng });
        })
        .catch(err => {
          dispatch({ type: "CIRCLE_ERROR", err });
        });

  }
}; 

export const deleteDisasters = (disaster) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      const id = disaster.id;
      firestore.collection('disasters').doc(id).delete().then(() => {
        dispatch({ type: "DISASTER_DELETED", id });
      })
      .catch(err => {
        dispatch({ type: "DISASTER_ERROR", err });
      });
  }
};


export const addRoadblock = (disaster, roadblock)=>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    console.log(roadblock)
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const id = disaster.id;
    let autoID = firestore.collection("someplace").doc().id;
    const update = {};
    update[`roadblocks.${autoID}`] = {'active': true, "location":[roadblock.lat,roadblock.lng]};
    console.log(id)
    firestore.collection('disasters').doc(id).update(update).then(() => {
      dispatch({ type: "ROADBLOCK_ADDED", roadblock });
    })
    .catch(err => {
      dispatch({ type: "ROADBLOCK_ERROR", err });
    });;
    
 }
}


export const deleteRoadblock = (disaster, roadblockid) =>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const id = disaster.id;
    const roadblockId = roadblockid;
    const update = {};
    update[`roadblocks.${roadblockId}`] = firestore.FieldValue.delete();
    console.log(id)
    firestore.collection('disasters').doc(id).update(update).then(() => {
      console.log("Deleted Roadblock " + roadblockId + " in disaster " + id );
      dispatch({ type: "ROADBLOCK_DELETED", roadblockId });

    })
    .catch(err => {
      dispatch({ type: "ROADBLOCK_ERROR", err });
    });;
    
 }
};


export const addEvacuationPoint = (disaster, evacuationPoint)=>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    console.log(evacuationPoint)
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const id = disaster.id;    
    let autoID = firestore.collection("someotherplace").doc().id;
    const update = {};
    update[`evacuationPoints.evacuationFrom`] = new firestore.GeoPoint(evacuationPoint.lat, evacuationPoint.lng);
    console.log(id)
    firestore.collection('disasters').doc(id).update(update).then(() => {
      dispatch({ type: "EVACUATIONPOINT_ADDED", evacuationPoint });

    })
    .catch(err => {
      dispatch({ type: "EVACUATIONPOINT_ERROR", err });
    });;
    
 }
}


export const deleteEvacuationPoint = (disaster) =>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // async code to the database
    const firestore = getFirestore();
    console.log("it has come here")
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const id = disaster.id;
    console.log("The disaster id is "+ id);
    const update = {};
    update[`evacuationPoints.evacuationFrom`] = firestore.FieldValue.delete();
    console.log(id)
    firestore.collection('disasters').doc(id).update(update).then(() => {
      console.log("Deleted Evacuation Point in disaster " + id );
      dispatch({ type: "EVACUATIONPOINT_DELETED" });

    })
    .catch(err => {
      dispatch({ type: "EVACUATIONPOINT_ERROR", err });
    });;
    
 }
};


export const addMarkerToFirestore = (marker, icon) =>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // async code to the database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    let type = null;
    if (icon === ambulanceIcon){
      type = "Ambulance"
    }
    else if(hospitalIcon === icon){
      type = "Hospital";
    }
    else if(policecarIcon ===icon){
      type = "Police";
    }
    else if(firetruckIcon === icon){
      type = "FireTruck";
    }
    
    else if(busIcon === icon){
      type = "Bus";
    }
    
    else if(carIcon === icon){
      type = "Car"
    }

  let autoID = firestore.collection(type).doc().id;
  const update = {};
  update[`${autoID}`] = [marker.lat, marker.lng];    
  firestore.collection('ResponderMarkers').doc(type).update(update).then(() => {
      dispatch({ type: "MARKER_ADDED", marker });

    })
    .catch(err => {
      dispatch({ type: "MARKER_ERROR", err });
    });;
    
 }
};

export const deleteMarkerFromFirestore = (marker, type) =>{
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

  const update = {};
  update[`${marker}`] = firestore.FieldValue.delete();    
  firestore.collection('ResponderMarkers').doc(type).update(update).then(() => {
      dispatch({ type: "MARKER_DELETED", marker });

    })
    .catch(err => {
      dispatch({ type: "MARKER_ERROR", err });
    });;
    
 }
};





