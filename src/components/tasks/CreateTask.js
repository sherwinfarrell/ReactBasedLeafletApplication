import React, {Component} from "react";
import {connect} from 'react-redux';
import {compose} from "redux";
import { createTask } from "../../store/actions/taskActions";
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Button } from 'react-bootstrap';
import {firestoreConnect, firebaseConnect} from "react-redux-firebase";
export class CreateTask extends Component {
    state = {
        title: '',
        disasterId: '',
        groupId:'',
        taskId:'',
        content: '',
        status: 'Active',
    };

    _handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
           [e.target.id]: e.target.value,
        });
    };
    _handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        this.props.createTask(this.state);
        this.props.history.push('/');
    };

    _handleChangeGroup = (e)=>{
        this.setState({
            [e.target.id]: e.target.value +"-"+ e.target.options[e.target.options.selectedIndex].text,
         });
    }

    _handleChangeTask = (e) =>{
        this.setState({
           [e.target.id]: e.target.value +"-"+ e.target.options[e.target.options.selectedIndex].text,
        });
    }

    getDisasters = (disasters)=>{
        if(disasters){
            let return_list = []
            Object.keys(disasters).forEach((key,value)=>{
                return_list.push(
                    <option value={disasters[key].id}>{disasters[key].id}</option>
                )
            })
            return return_list;
        }
        return null;
    }

    getTasks = (groupId)=>{
        let return_list = []
        if(groupId){
        if(groupId==1){
            return_list.push(<option value={1}>Goto Disaster Zone</option> )
            return_list.push(<option value={2}>Set Roadblocks</option>)
        }
        else if(groupId ==2){
            return_list.push(<option value={1}>Goto Disaster Zone</option> )
            return_list.push(<option value={2}>Put Out Fire</option>)
        }
        else if(groupId == 3){
            return_list.push(<option value={1}>Goto to Evacuation Point</option> )
            return_list.push(<option value={2}>Evacuate Everyone</option>)
        }
        else if(groupId == 4){
            return_list.push(<option value={1}>Goto Disaster Zone</option> )
            return_list.push(<option value={2}>Goto Nearest Hospital</option>)

        }
        if(return_list){
            return return_list
        }
    }
        else return null;
    }

    render() {
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        return (
           
            <Container>
                <Form onSubmit={this._handleSubmit}>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" id="title" placeholder="Title of the task" onChange={this._handleChange}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Select Disaster</Form.Label>
                        <Form.Control as="select"  id="disasterId"  onChange={this._handleChange}>
                        <option  value="null">Please select an option</option>
                        {this.getDisasters(this.props.disasters)}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group >
                        <Form.Label>Select Responder</Form.Label>
                        <Form.Control as="select"  id="groupId"  onChange={this._handleChangeGroup}>
                        <option  value="null">Please select an option</option>
                        <option value={1}>Group 1: Police</option>
                        <option value={2}>Group 2: Fire Service</option>
                        <option value={3}>Group 3: Emergency Ecavuator</option>
                        <option value={4}>Group 4: Ambulance And Paramedics</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group >
                        <Form.Label>Select Task</Form.Label>
                        <Form.Control as="select"  id="taskId"  onChange={this._handleChangeTask}>
                        <option lable="Please select an option"></option>
                        {this.getTasks(this.state.groupId.split("-")[0])}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Task Content</Form.Label>
                        <Form.Control as="textarea" id="content" onChange={this._handleChange} rows={3} />
                    </Form.Group>
                    
                    <Button type='submit' variant="outline-primary" >Create Task</Button>
                </Form>
            </Container>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        disasters : state.firestore.ordered.disasters

    }
};

const matchDispatchToProps = (dispatch) => {
    return{
        createTask: (task) => dispatch(createTask(task))
    }
};

export default compose(connect(mapStateToProps, matchDispatchToProps), firestoreConnect([
    {collection: 'disasters'}
  ]))(CreateTask)