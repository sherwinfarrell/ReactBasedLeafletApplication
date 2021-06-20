import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return(
        <ul className="right">
            <li><NavLink className="logintext" to='/signin'>Log In</NavLink></li>
            <li><NavLink className="signuptext" to='/signup'>Sign Up</NavLink></li>
        </ul>
    );
};

export default SignedOutLinks