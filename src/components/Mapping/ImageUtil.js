
import L from 'leaflet';
import personMarker from "../../img/personmarker.svg"
import roadblock from "./icons/Roadblock.png"
import ambulance from "./icons/ambulance.png"
import hospital from "./icons/hospital.png"
import policecar from "./icons/policecar.png"
import firetruck from "./icons/firetruck2.png"
import bus from "./icons/SchoolBus.svg"
import car from "./icons/carsvg.svg"
import train from "./icons/train.png"
import emergencyEvacuator from "./icons/emergencyEvacuator.png"
import individual from "./icons/individual.png"



const personIcon =  L.icon({
  iconUrl: personMarker,
  iconSize:     [38, 95], // size of the icon
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76]// 

});


const roadblockIcon = new  L.icon({
    iconUrl: roadblock,
    iconSize:     [20, 40], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 
  
  });


const ambulanceIcon = L.icon({
    iconUrl: ambulance,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });

  let hospitalIcon = L.icon({
    iconUrl: hospital,
    iconSize:     [20, 30], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });


  let policecarIcon = L.icon({
    iconUrl: policecar,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });
  let firetruckIcon = L.icon({
    iconUrl: firetruck,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });
  let busIcon = L.icon({
    iconUrl: bus,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });
  let carIcon = L.icon({
    iconUrl: car,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });

  let trainIcon = L.icon({
    iconUrl: train,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });


  let emergencyEvacuatorIcon =  L.icon({
    iconUrl: emergencyEvacuator,
    iconSize:     [30, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });

  const individualIcon = L.icon({
    iconUrl: individual,
    iconSize:     [50, 50], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]// 

  });


export { personIcon, roadblockIcon, ambulanceIcon, hospitalIcon, policecarIcon,firetruckIcon, busIcon, carIcon, trainIcon, emergencyEvacuatorIcon, individualIcon};






