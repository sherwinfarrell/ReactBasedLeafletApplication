import { Map, TileLayer, FeatureGroup, Marker, Polygon, Popup } from 'react-leaflet';
import {trainIcon, roadblockIcon, busIcon, personIcon, policecarIcon, firetruckIcon, emergencyEvacuatorIcon, ambulanceIcon, individualIcon, responderIcon} from './ImageUtil'




const GetRailData = (props1) => {
    let railData = props1.railData;
    if(railData){
      let returnList = [];
      Object.keys(railData).forEach((key, value) => {

          let trains = railData[1]
          if(trains){
            Object.keys(trains).forEach((key1, value) => {

              let trainsKey = trains[key1];
              Object.keys(trainsKey).forEach((key2, value) => {
                let trainPoints = trainsKey[key2];
                let lat = trainPoints['latitude'];
                let long = trainPoints['longitude'];
                if(lat && long){
                  returnList.push(
                    <Marker position = {[lat,long]} icon={trainIcon} >
                      <Popup>
                          <button onClick={(e) => console.log("Sorry, work in progress!")}>Delete Train Coord Point?</button>
                      </Popup>
                    </Marker>)
                }
                
              })
            })

          }
      })
      return returnList;
    }
    return (null);

  }




    const GetDisasterCoords = (props) => {
        let disasters = props.disasters;
        if(disasters){
          let returnList = [];
          Object.keys(disasters).forEach((key,value) => {
            if(Object.keys(disasters[key]).length != 0){
            let polygon = JSON.parse(disasters[key].polygon)
            if(polygon.coordinates){
              if(disasters[key].individualsInDisaster.totalIndividuals){
                let individuals_to = disasters[key].individualsInDisaster.totalIndividuals.toString();
                  returnList.push  (
                    <Polygon positions={polygon.coordinates[0]} color={'red'}></Polygon>
                  )
              }
            }
          }}
          
          );
          return returnList;
        }
        return (null)
      }
  
    const GetBusCoords = (props) => {
        let busData = props.busData;
        if(busData){
          let returnList = [];
          Object.keys(busData).forEach((key, value) => {
            let busKey = busData[key];
            Object.keys(busKey).forEach((key, value) =>{
              let lat =  busKey[key]['latitude'];
              let long =  busKey[key]['longitude'];
              if(lat && long){  
                returnList.push(
                  <Marker position = {[lat,long]} icon={busIcon} >
                  </Marker>)  
                  }  
              })
            })
            return returnList;
          }
          return (null);
  
      }


     


    let GetEpiCentreCoords = (props) => {
        let disasters = props.disasters;
        if(disasters){
          let returnList = [];
          Object.keys(disasters).forEach((key,value) => {
            if(Object.keys(disasters[key]).length != 0){
              if(disasters[key].epicentre){  
                let epicentre_coord  = disasters[key].epicentre.epicentre;  
                returnList.push(
                  <Marker position = {[epicentre_coord.x_, epicentre_coord.N_]} >
                  </Marker>)          
              }
          }}
          
          );
          return returnList;
        }
        return (null)
      }


    let getResponderIcon = (groupId) => {
      let responderIcon = null;
      if(groupId===0){
        responderIcon = individualIcon;
      }
      else if(groupId === 1){
         responderIcon = policecarIcon;                  
      }
      else if(groupId ===2 ){
        responderIcon = firetruckIcon;
      }
      else if(groupId === 3){
        responderIcon = emergencyEvacuatorIcon;
      }
      else if(groupId === 4){
        responderIcon = ambulanceIcon;
      }
      return responderIcon;
    }

    let getResponderType = (groupId) => {
      let responderType = null;
      if(groupId === 0){
        responderType = "Individual";
      }
      else if(groupId === 1){
        responderType = "Police";                  
      }
      else if(groupId === 2 ){
        responderType = "Fire Service";
      }
      else if(groupId === 3){
        responderType = "Emergency Evacuator";
      }
      else if(groupId === 4){
        responderType = "Ambulance and Paramedics";
      }
      return responderType;
    }

    let GetLiveLocation = (props) =>{
      let liveLocation = props.liveLocation;
      let returnList = [];
      if(liveLocation){
      Object.keys(liveLocation).forEach((key, value) =>{
        let liveLocationUser = liveLocation[key];
          let liveLocationCoords = liveLocationUser.location;
          let responderIcon = getResponderIcon(liveLocationUser.group)
          if(responderIcon!==null){
          returnList.push(
            <Marker position={liveLocationCoords} icon={responderIcon}>
              <Popup>
                    <p><b>User:</b> {liveLocationUser.id}</p>
                    <p><b>Responder Group</b> {getResponderType(liveLocationUser.group)}</p>
              </Popup>
            </Marker>
          )}
      })
      return returnList;
    }
    return null;
    }

    
    const reverseCoord =  (coords) => {
        var coordsNew = [];
        if(coords){
            coords.forEach(function (coord) {
            coordsNew.push([coord[1], coord[0]]);
          });
        }
        return coordsNew;
    }


    const evacuationSatus = (booleanFlag) =>{
      if(booleanFlag){
        if(booleanFlag == true){
          return "Done"
        }
        else if(booleanFlag == false){
          return "Pending"
        }
      }
      else return "Pending";
    }

    const fireSatus = (booleanFlag) =>{
      if(booleanFlag){
        if(booleanFlag == true){
          return "Pending"
        }
        else if(booleanFlag == false){
          return "Done"
        }
      }
      else return "Pending";
    }

export {GetRailData, GetDisasterCoords, GetBusCoords, GetEpiCentreCoords, reverseCoord, GetLiveLocation, evacuationSatus, fireSatus }