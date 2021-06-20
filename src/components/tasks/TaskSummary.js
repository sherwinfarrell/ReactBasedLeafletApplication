import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { deleteTask } from "../../store/actions/taskActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Button, Card } from 'react-bootstrap';


// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//     root: {
//       minWidth: 275,
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });




export const TaskSummary = (props) => {


    const task = props.task;
    
    const _handleSubmit = (e) => {
        e.preventDefault();
        props.deleteTask(task);
    };

    const getGroupType = (id) =>{
        console.log(id)
        if(id == 1){
            return  <Card.Subtitle className="mb-2 text-muted">Group: Police</Card.Subtitle>
        }
        else if(id == 2){
            return  <Card.Subtitle className="mb-2 text-muted">Group: Fire Service </Card.Subtitle>
        }
        else if(id == 3){
            return  <Card.Subtitle className="mb-2 text-muted">Group: Emergencyy Ecavuator</Card.Subtitle>
        }
        else if(id == 4){
            return  <Card.Subtitle className="mb-2 text-muted">Group: Ambulance And Paramedics</Card.Subtitle>
        }
        else{
            return null;
        }
    }

    const getTaskType = (taskId) =>{
        let return_list = []
        if(taskId){
            
        }
    }

//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

    return(
    // <div className="card blue-grey z-depth-5 task-summary">
    //             <div className="card-content white-text text-darken-3">
    //                 <span className="card-title">{task.title}</span>
    //                 <p>For - {task.groupId}</p>
    //                 <p>Posted by {task.authorFirstName + task.authorLastName}</p>
    //                 <p className="black-text">{moment(task.createdAt.toDate()).calendar()}</p>
                    // <button className="btn btn-delete grey" onClick={_handleSubmit}>
                    //     <span className="black-text" >Delete</span>
                    // </button>
    //             </div>
    //         </div>
            // <Card style={{ width: '18rem' }}>
            //     <Card.Body>
            //     <Card.Title>{task.title}</Card.Title>
            //     {getGroupType(task.groupId)}
            //     <Card.Footer className="text-muted">Posted by {task.authorFirstName + task.authorLastName}</Card.Footer>
            //     <Button variant="grey" onClick={_handleSubmit}>Delete Task</Button>

            //     </Card.Body>
            // </Card>
            <Card >
                <Card.Header className="text-muted">{task.title}</Card.Header>
                <Card.Body>
                    <Card.Title>{getGroupType(task.groupId.split('-')[0])}</Card.Title>
                    <Card.Subtitle>{task.taskId.split('-')[1]}</Card.Subtitle>
                    <Button variant="light" onClick={_handleSubmit}>Delete</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{moment(task.createdAt.toDate()).calendar()}</Card.Footer>
            </Card>
            )

//             return (<Card className={classes.root} variant="outlined">
//                         <CardContent>
//                             <Typography className={classes.title} color="textSecondary" gutterBottom>
//                                 {task.title}
//                             </Typography>
//                             <Typography variant="h5" component="h2">
//                                 Posted by {task.authorFirstName + task.authorLastName}
//                             </Typography>
//                             <Typography variant="body2" component="p">
//                                 {moment(task.createdAt.toDate()).calendar()}                                <br />
//                             </Typography>
//                         </CardContent>
//             </Card>
// )

};

const mapDispatchToProps = (dispatch) => {
    return{
        deleteTask: (task) => dispatch(deleteTask(task))
    }
};

export default connect(null,mapDispatchToProps)(TaskSummary);