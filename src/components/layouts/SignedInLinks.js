import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from "../../store/actions/authActions";

export const SignedIn = (props) => {

    return(
        <ul className="right">
            <li><NavLink to='/create'>New Task</NavLink></li>
            <li><a onClick={props.signOut} className="logouttext">Log Out</a></li>
            <li><NavLink to="/statistics">Stats</NavLink></li>
            <li> <NavLink to ="/map">Map</NavLink>  </li>
            <li><NavLink to='/' className='btn btn-floating pinklighten-1'>{props.profile.initials}</NavLink></li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
};

export default connect(null, mapDispatchToProps)(SignedIn);