import React, {  Fragment } from 'react';
import { getUserInfo } from '../services/Auth.service';


function AuthValidator(props) {
    const isValid=()=>{
        if(getUserInfo()){
            return true;
        }else{
            return false;
        }
    }
return (
    <Fragment>
        {isValid()?<props.authorizedcomponent {...props}/>:
        (
            props.history.push('/')
            
            )}
    </Fragment>
)
}

export default AuthValidator