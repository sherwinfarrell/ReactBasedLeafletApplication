

import React, { useState, useEffect, useRef } from 'react';
import {connect} from "react-redux";
import {firestoreConnect, firebaseConnect} from "react-redux-firebase";
import {compose} from "redux";
import {initiateTaskEnd} from "../../store/actions/taskActions"
import { Map, TileLayer, FeatureGroup, Marker, Polygon, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import Control from 'react-leaflet-control';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { roadblockIcon, personIcon, ambulanceIcon, hospitalIcon, policecarIcon,firetruckIcon, busIcon, carIcon, trainIcon} from './ImageUtil'
import { GetRailData, GetBusCoords, GetEpiCentreCoords, GetDisasterCoords, reverseCoord, GetLiveLocation, evacuationSatus} from "./Util"
import { addLatLng, addLatLngs, addCircle, deleteDisasters, deleteRoadblock, deleteEvacuationPoint,addRoadblock, addEvacuationPoint, addMarkerToFirestore, deleteMarkerFromFirestore } from "../../store/actions/mapAction";




 


export const MapView = (props) => {

   const mapRef = useRef()
    const [map, setMap] = useState(null);
    const MySwal = withReactContent(Swal)
    const [markers, setMarkers]= useState([])
    const [editableFG, setEditableFG] = useState(null);
    const [markerType , setMarkerType] = useState(null)
    const [defaultIcon, setDefaultIcon] = useState(null)

    let busData = props.bus_data;
    let railData = props.rail_data;
    let disasters = props.disasters;
    let responderMarkers = props.ResponderMarkers;


    let disasterCount = 0

    let disasterPolys = (disasters) => {
      if(disasters){
        let returnList = [];
        Object.keys(disasters).forEach((key,value) => {
          if(Object.keys(disasters[key]).length != 0){
          let polygon = JSON.parse(disasters[key].polygon)
          if(polygon.coordinates){
            if(disasters[key].individualsInDisaster.totalIndividuals){
            let individuals_to = disasters[key].individualsInDisaster.totalIndividuals.toString();
            returnList.push  (
                      L.polygon(polygon.coordinates[0])
            )
            }
          }
        }}
        
        );
        return returnList;
      }
      return (null)
    }

    const _onCreated = e => {
    
        const drawnItems = editableFG.leafletElement._layers;

        var layer = e.layer;

        var drawedCord = e.layer.toGeoJSON().geometry.coordinates;
        var radius = e.layer.toGeoJSON()
        const {layerType } = e;


       if(e.layerType =="rectangle"){
            let latLngs = layer.getLatLngs()
            let latLngsArr = []
            Object.keys(latLngs[0]).forEach((e,i) => latLngsArr.push([latLngs[0][e].lat, latLngs[0][e].lng]))
            let coordinates = {'coordinates': latLngsArr}
            props.addLatLngs(coordinates, disasterCount)
            disasterCount = disasterCount +1;
       }
       if(e.layerType == "circle"){
           props.addCircle(layer._latlng, layer._mRadius, "Active")
       }

    };

 


    const onFeatureGroupReady = reactFGref => {
        setEditableFG(reactFGref);
    };


    const handleClick = (e) => {
      const { lat, lng } = e.latlng;
      let map = mapRef.current.leafletElement;
      let disasterPoly = disasterPolys(disasters)
      let filteredDisasters = disasterPoly.filter(a  => a.getBounds().contains(e.latlng) )

      if(defaultIcon != null){
        if(defaultIcon == roadblockIcon || defaultIcon == personIcon){
            if(filteredDisasters.length !== 0)
            {
              disasterPoly.map((a,i)=>{
                if(a.getBounds().contains(e.latlng) ){
                  let marker = L.marker(e.latlng, {icon:defaultIcon})
                  marker.on('click', (e)=> {
                    if(window.confirm('Do you want to delete the marker?')){
                      map.removeLayer(marker)
                  }})
                  if(defaultIcon==roadblockIcon){
                  props.addRoadblock(disasters[i], e.latlng)}
                  else if(defaultIcon==personIcon){
                    props.addEvacuationPoint(disasters[i], e.latlng)
                  }    
                  const curMarkerType = markerType
                  let currMarker = [ curMarkerType, marker]
                  setMarkers(markers.concat( [[markerType, marker]])) 
                }
              })          
            }
            else{

             alert("This marker needs to be in a disaster zone")
            }
        }
        else{
          let marker = L.marker(e.latlng, {icon:defaultIcon})
            props.addMarkerToFirestore(e.latlng, defaultIcon)
            const curMarkerType = markerType
            let currMarker = [ curMarkerType, marker]          
            setMarkers(markers.concat( [[markerType, marker]])) 
          }        
        }
        else{
          let disasterPoly = disasterPolys(disasters)
          let mapDisasters = disasterPoly.map((a,i)  => {
            if(a.getBounds().contains(e.latlng)){
              let evacLat = props.disasters[i].evacuationPoints.evacuationFrom.x_
              let evacLng = props.disasters[i].evacuationPoints.evacuationFrom.N_
              if(evacLat){
                  evacLat = ""
                  evacLng = ""
              }

              MySwal.fire({
                title: `Disaster Id: ${props.disasters[i].id}`,
                text: `The number of people in this disaster is: ${props.disasters[i].individualsInDisaster.totalIndividuals}   
                  The number of Active Emergency Reponders on the scene are ${Object.keys(props.disasters[i].activeEmergencyResponse).length}.  
                  The Epicentre Location is [${props.disasters[i].epicentre.epicentre.x_}, ${props.disasters[i].epicentre.epicentre.N_}] and the evacuation
                  location is [${evacLat}, ${evacLng}].
                  Evacuation complete: ${evacuationSatus(props.disasters[i].evacuationComplete.evacuationComplete)}.
                  For More Info Regarding the Disaster Please Visit the Stats Page....`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete Disaster!',
              }).then((result) => {
                if (result.isConfirmed) {
                  props.deleteDisasters(props.disasters[i])
                  let tasks = props.tasks;
                  if(tasks){
                    tasks.forEach((task)=> {                      
                      if(task.disasterId === props.disasters[i].id){
                        props.initiateTaskEnd(props.disasters[i], task)
                      }
                    }
                  )
                  }
                  MySwal.fire(
                    'Deleted!',
                    'Disaster has been deleted.',
                    'success'
                  )
                }
                
              })

            }
          } )
        }
    }

    const selectHandler = (e) => {
        
        let selected =   document.getElementById("markerdropdown").value
        setMarkerType(document.getElementById('markerdropdown')[document.getElementById('markerdropdown').selectedIndex].innerHTML)

        if(selected == 1)
        {
          setDefaultIcon(null);
        }
        if(selected == 2)
        {           
            setDefaultIcon(ambulanceIcon);
        }
        if(selected == 3)
        {
          setDefaultIcon(firetruckIcon);
        }
        if(selected == 4)
        {
          setDefaultIcon(policecarIcon);
        }
        if(selected == 5)
        {
          setDefaultIcon(hospitalIcon);
        }
        if(selected == 6)
        {
          setDefaultIcon(busIcon);
        }
        if(selected == 7)
        {
              setDefaultIcon(carIcon);
        }
        if(selected == 8)
        {
              setDefaultIcon(personIcon);
        }
        if(selected == 9){
          setDefaultIcon(roadblockIcon);
        }
    }


    const getMarkerIcon = (type)=>{
      let icon = null;
      if (type === "Ambulance"){
        icon = ambulanceIcon
      }
      else if( "Hospital" === type){
        icon = hospitalIcon;
      }
      else if("Police" ===type){
        icon = policecarIcon;
      }
      else if("FireTruck" === type){
        icon = firetruckIcon;
      }
      else if("Bus" === type){
        icon = busIcon;
      }
      else if("Car" === type){
        icon = carIcon;
      }
      return icon;
    }

    useEffect(() => {
            let map = mapRef.current.leafletElement;
            let hospitalMakers = [[53.33925098,	-6.29706676],[53.29108525	,-6.378797956],[53.31617842	,-6.213683926],[53.29303003	,-6.136440217],[53.35892378	,-6.2656689],[53.38819173	,-6.369721092],[53.39092162	,-6.223907]]
            hospitalMakers.forEach((m)=>  L.marker(m, {icon:hospitalIcon}).addTo(map))                
    },[]);



    let GetRoadblockCoords = (props1) => {
      let disasters = props1.disasters;
      if(disasters){
        let returnList = [];
        Object.keys(disasters).forEach((key,value) => {
          if(Object.keys(disasters[key]).length != 0){
            if(disasters[key].roadblocks){
              Object.keys(disasters[key].roadblocks).forEach((roadblock,value)=>{
                let roadBlock = disasters[key].roadblocks[roadblock].location;
                let roadBlockCheck = disasters[key].roadblocks[roadblock]
                if(roadBlockCheck.active){
                returnList.push  (
                <Marker position = {roadBlock} icon={roadblockIcon}>
                  <Popup>
                      <button onClick={(e) => props.deleteRoadblock(disasters[key], roadblock)}>Delete Roadblock?</button>
                  </Popup>
                </Marker> 
                     )
                }
              })
            }
        }}
        
        );
        return returnList;
      }
      return (null)
    }


    let GetEvacuationCoords = (props1) => {
      let disasters = props1.disasters;
      if(disasters){
        let returnList = [];
        Object.keys(disasters).forEach((key,value) => {
          if(Object.keys(disasters[key]).length != 0){
            if(disasters[key].evacuationPoints.evacuationFrom){
              let evacuationPoint  = disasters[key].evacuationPoints.evacuationFrom;              
              returnList.push(
                <Marker position = {[evacuationPoint.x_, evacuationPoint.N_]} icon={personIcon}>
                  <Popup>
                      <button onClick={(e) => props.deleteEvacuationPoint(disasters[key])}>Delete Evacuation Point?</button>
                  </Popup>
                </Marker>)
            }
        }}
        
        );
        return returnList;
      }
      return (null)
    }


  let BusInDisasterZone = (props1) =>{
      let disasters = props1.disasters;
      let returnList = []
      if(disasters){
        Object.keys(disasters).forEach((key,value)=>{
            let disasterObj = disasters[key].reroutedBuses;
            Object.keys(disasterObj).forEach((key1,value1) =>{
              let busEvac = JSON.parse(disasterObj[key1])
              let busEvacCoordinates = reverseCoord(busEvac.coordinates)
              returnList.push  (
                <Polyline positions={busEvacCoordinates}> </Polyline>
              )
            })
        })
        return returnList;
      }
      return null;
    }


    let ResponderMarkers = (newProps) => {
      let responderMarkers = props.ResponderMarkers;
      if(responderMarkers){
        let returnList = [];
        Object.keys(responderMarkers).forEach((key, value)=>{
            let markerKey =key;
            Object.keys(responderMarkers[markerKey]).forEach((key1, value1)=>{
                if(key1 != "id"){
                  let markerCoords =  responderMarkers[markerKey][key1]
                  let markerIcon = getMarkerIcon(responderMarkers[markerKey]['id'])
                  returnList.push(
                    <Marker position = {[markerCoords[0], markerCoords[1]]} icon={markerIcon}>
                      <Popup>
                          <button onClick={(e) => props.deleteMarkerFromFirestore(key1,responderMarkers[markerKey]['id'] )}>Delete Marker?</button>
                      </Popup>
                    </Marker>)
                }
            })
        })
        return returnList;
      }
      return [];
    }
  
    

    return (
        <div>
        <Map ref={mapRef}
            center={[53.3498, -6.2603]}
            zoom={12}
            style={{ height: '91vh' }}
            onclick = {handleClick} 
            whenCreated={setMap}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png">
            </TileLayer>

          <GetDisasterCoords disasters={disasters}/>
          <GetRoadblockCoords disasters={disasters} deleteRoadblock={props.deleteRoadblock}/>
          <GetEvacuationCoords disasters={disasters} deleteEvacuationPoint={props.deleteEvacuationPoint}/>
          <GetEpiCentreCoords disasters={disasters}/> 
          <GetBusCoords busData={busData}/>
          <GetRailData railData={railData}/>
          <ResponderMarkers responderMarkers={responderMarkers}/>
          <BusInDisasterZone disasters={disasters}></BusInDisasterZone>
          <GetLiveLocation liveLocation={props.liveLocation}></GetLiveLocation>

            <FeatureGroup
                ref={featureGroupRef => {
                    onFeatureGroupReady(featureGroupRef);
                }}>
                <EditControl style={{color: "red"}} 
                        draw={{
                                    circle: {
                                        shapeOptions: { color: "red" },
                                        showLength: true,
                                        metric: true,
                                        feet: true,
                                        showArea: true
                                    },
                                    polyline: { 
                                        shapeOptions: { color: "red" } 
                                    },
                                    polygone: { 
                                        shapeOptions: { color: "red" } 
                                    },
                                    rectangle: { 
                                        shapeOptions: { color: "red" } 
                                    },
                                    circlemarker:false

                            }}
                                
                        position="topright" onCreated={_onCreated} />
            </FeatureGroup>
         
           
            <Control position="bottomleft" >
                     <div className="input-field col s12">
                        <select onChange = {selectHandler} id ="markerdropdown" className="browser-default">
                            <option  value="" disabled selected>Select Marker</option>
                            <option value="1"></option>
                            <option value="2">Ambulance Marker</option>
                            <option value="3">Firetruck Marker</option>
                            <option value="4">Police Marker</option>
                            <option value="5">Hospital Marker</option>
                            <option value="6">Bus Marker</option>
                            <option value="7">Car Marker</option>
                            <option value="8">Evacuation Marker</option>
                            <option value="9">RoadBlock Marker</option>

                          </select>
                          <label></label>
                        </div>
            </Control>

      
          </Map>
          </div>
      );
  };



 

const mapDispatchToProps = (dispatch) => {
    return {
        addLatLng: (latLng) => dispatch(addLatLng(latLng)),
        addLatLngs: (latLngs, count)=> dispatch(addLatLngs(latLngs, count)),
        addCircle: (latLngs,type, status)=> dispatch(addCircle(latLngs, type,status)),
        addRoadblock: (disaster,roadblock)=> dispatch(addRoadblock(disaster, roadblock)),
        addEvacuationPoint: (disaster, evacuationPoint) => dispatch(addEvacuationPoint(disaster, evacuationPoint)),
        deleteDisasters: (disaster) => dispatch(deleteDisasters(disaster)),
        deleteRoadblock: (disaster, roadblockid) => dispatch(deleteRoadblock(disaster, roadblockid)),
        deleteEvacuationPoint: (disaster) => dispatch(deleteEvacuationPoint(disaster)),
        addMarkerToFirestore : (marker, icon) => dispatch(addMarkerToFirestore(marker, icon)),
        deleteMarkerFromFirestore:(marker, type)=> dispatch(deleteMarkerFromFirestore(marker, type)),
        initiateTaskEnd: (disaster, task) => dispatch(initiateTaskEnd(disaster, task))

    }
};

const mapStateToProps = (state) => {
  return {
      disasters : state.firestore.ordered.disasters,
      bus_data: state.firebase.ordered.bus_data,
      rail_data: state.firebase.ordered.rail_data,
      ResponderMarkers: state.firestore.ordered.ResponderMarkers, 
      liveLocation : state.firestore.ordered.LiveLocation,
      tasks : state.firestore.ordered.tasks
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect([
  {collection: 'disasters'}, {collection: 'ResponderMarkers'}, {collection: 'LiveLocation'}
]), firebaseConnect(['bus_data','rail_data']))(MapView);

