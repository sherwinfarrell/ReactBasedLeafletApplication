import React, { useState, useEffect, useCallback, useRef } from 'react';
import {connect} from "react-redux";
import {firestoreConnect, firebaseConnect} from "react-redux-firebase";
import {compose} from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect, useFirebaseConnect, useFirestore, useFirebase } from "react-redux-firebase";
import { Bar, Line, Pie } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Card, CardColumns, ListGroup, ListGroupItem} from 'react-bootstrap'
import moment from 'moment'
import {evacuationSatus, fireSatus} from "../Mapping/Util"




export const Statistics = (props) => {

    let [generalLables, setGeneralLabels] = useState([]);
    let [disasterLabels, setDisasterLables] = useState([]);
    let [persons,setPersons] = useState([]);
    let [roadblocksNumber, setRoadblockNumber] = useState([]);
    let [reRoutedBuses, setReRoutedBuses] = useState([]);

    let evacuatedPeople= (value) =>{
        if(value){
            return value;
        }
        else {return 0};
    }

    useEffect(() => {
        let disasters = props.disasters;
        if(disasters){
            let disasterLenght = Object.keys(disasters).length;

            let personList = []
            let disasterLabelsList = []
            let roadblockList = []
            let reRoutedBusList = []
            setGeneralLabels(Array.from({ length: disasterLenght }, (_, i) => i + 1))
            Object.keys(disasters).forEach((key,value)=>{            
                let disasterObj = disasters[key]
                
                personList.push(disasterObj.individualsInDisaster.totalIndividuals)
                disasterLabelsList.push(disasterObj.id)

                let roadblocksKey= disasterObj.roadblocks

                let roadblocksLenght = Object.keys(roadblocksKey).length;
                roadblockList.push(roadblocksLenght);

                let reRoutedBusLenght = Object.keys(disasterObj.reroutedBuses).length;
                reRoutedBusList.push(reRoutedBusLenght)


            })
            setPersons(personList)
            setDisasterLables(disasterLabelsList)
            setRoadblockNumber(roadblockList);
            setReRoutedBuses(reRoutedBusList);

        }
        
    }, [props.disasters])

    let getEmergencyResponder = (disasterObj) => {
        let returnList = []
        if(disasterObj){
        Object.keys(disasterObj.activeEmergencyResponse).forEach((key,i) => {
            console.log("The key is")
            console.log(key)
            if(key === "emergencyEvacuator"){
                returnList.push(<div><b>{i+1}.</b> Emergency Evacuator</div>)
            }
            else if(key === "fireService"){
                returnList.push(<div><b>{i+1}.</b> Fire Service</div>)
            }
            else if(key === "police"){
                returnList.push(<div><b>{i+1}.</b> Police </div>)
            }
        })
        return returnList;
    }
    return null;
    }

    let GetDisasterInfo = () => {
        let disasters = props.disasters;
        let returnList = [];
        if(disasters){
        Object.keys(disasters).forEach((key, value) => {
            console.log(key)
            let disasterObj = disasters[key];
            console.log("The Disaster Object is")
            console.log(disasterObj)
            let returnListInner = [];

            returnList.push(
                <Card>
                    <Card.Body>
                        <Card.Title><b>Disaster Id: {disasterObj.id}</b></Card.Title>
                        <Card.Text>
                            This disaster has its epicentre at <b>[{disasterObj.epicentre.epicentre.x_},{disasterObj.epicentre.epicentre.N_}]</b>.
                            <div>It has the following emergency coordinators currently working on the disaster:</div>
                            {getEmergencyResponder(disasterObj)}
                        </Card.Text>

                        <ListGroup>
                            <ListGroup.Item><b>Individuals In the Disaster Zone: </b>{disasterObj.individualsInDisaster.totalIndividuals}</ListGroup.Item>
                            <ListGroup.Item><b>Number of Roablocks in the Disaster Zone: </b>{Object.keys(disasterObj.roadblocks).length}</ListGroup.Item>
                            <ListGroup.Item><b>Number of Re Routed Buses: </b>{Object.keys(disasterObj.reroutedBuses).length}</ListGroup.Item>   
                            <ListGroup.Item><b>Evacuation Satus: </b>{evacuationSatus( disasterObj.evacuationComplete)}</ListGroup.Item> 
                            <ListGroup.Item><b>Individuals Evacuated or Rescued: </b>{ evacuatedPeople(disasterObj.individualsInDisaster.individualsEvacuated)}</ListGroup.Item>              
                            <ListGroup.Item><b>Fire Satus: </b>{fireSatus( disasterObj.disasterType.Fire)}</ListGroup.Item>              
                        </ListGroup>

                        <Card.Text>
                            <small className="text-muted">{moment(disasterObj.time).fromNow()}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )

        })
        return returnList;
    }
        return null;
    }

    return (
        <div>
            <Container>
                <Row>
                    <CardColumns className="disasterCardInfos">
                        <GetDisasterInfo ></GetDisasterInfo>
                    </CardColumns>
                </Row>
                <Row>
                    <Bar className="person-chart"
                                data={{
                                    labels: disasterLabels,
                                    datasets: [
                                        {
                                            label: 'People in Disaster',
                                            data: persons,
                                            backgroundColor: [
                                                '#5C63A2',
                                            ]
                                        }
                                    ]
                                }}


                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        xAxes: [{
                                        offset: true,
                                        ticks: {
                                            suggestedMin: 1,
                                            beginAtZero: false
                                        }
                                        }]
                                    },
                                    title: {
                                        display: true,
                                        text: 'Disaster Stats',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                </Row>
                <Row>
                <Bar className="roadblocks-chart"
                                data={{
                                    labels: disasterLabels,
                                    datasets: [
                                        {
                                            label: 'Roadblocks in Disaster',
                                            data: roadblocksNumber,
                                            backgroundColor: [
                                                '#1B4E6B',
                                            ]
                                        }
                                    ]
                                }}


                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        xAxes: [{
                                        offset: true,
                                        ticks: {
                                            suggestedMin: 1,
                                            beginAtZero: false
                                        }
                                        }]
                                    },
                                    title: {
                                        display: true,
                                        text: 'Disaster Stats',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                </Row>
                <Row>
                        <Bar className="buses-chart"
                                data={{
                                    labels: disasterLabels,
                                    datasets: [
                                        {
                                            label: 'Re Routed Buses in the Disaster',
                                            data: reRoutedBuses,
                                            backgroundColor: [
                                                '#EC7176',
                                            ]
                                        }
                                    ]
                                }}


                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        xAxes: [{
                                        offset: true,
                                        ticks: {
                                            suggestedMin: 1,
                                            beginAtZero: false
                                        }
                                        }]
                                    },
                                    title: {
                                        display: true,
                                        text: 'Disaster Stats',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        disasters : state.firestore.ordered.disasters,  
    }
  };

export default compose(connect(mapStateToProps, null), firestoreConnect([
  {collection: 'disasters'}
]))(Statistics);
