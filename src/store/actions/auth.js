import axios from 'axios';
import * as actionType from './actionTypes';

const authStart=()=>{
    return {
        type:actionType.AUTH_START
    };
};
const authSuccess=(authData)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        authData:authData,
        
    };
};
export const setAuthRedirectPath=(path)=>{
    return{
type:actionType.SET_AUTH_REDIRECT_PATH,
path:path
    };
}
const authFail=(error)=>{
    return{
        type:actionType.AUTH_FAIL,
        error:error
    };
};
export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');

    return{
        type:actionType.AUTH_LOGIUT
    }
}
const authLogOut =(expireTime)=>{
  return dispatch =>{
      setTimeout(()=>{
       dispatch(logOut())
      },expireTime*1000)
  }
}
export const auth=(email,pass,isSignUp)=>{
    
    return dispatch=>{
      
        dispatch(authStart());
        const authData={
            email:email,
            password:pass,
            returnSecureToken:true
        } 
         let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQwIdrvWu2QH6Qn18t9xbSh7_yOjSBriE';
        if(!isSignUp)
        {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQwIdrvWu2QH6Qn18t9xbSh7_yOjSBriE';
        }
    
        axios.post(url,authData)
        .then(response=>{
            console.log(response)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationTime',new Date(new Date().getTime()+(response.data.expiresIn*1000)))
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data));
            dispatch(authLogOut(response.data.expiresIn))
        })
        .catch(
            err=>{
             
                dispatch(authFail(err.response.data.error.message));
            }
        )

    }
}
export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
           dispatch( logOut());
        }
        else
        {
            const expireTime=new Date(localStorage.getItem('expirationTime'));
            if(expireTime<new Date()){
           dispatch( logOut());
                

            }
            else{
                const userId=localStorage.getItem('userId')
            dispatch(authSuccess(token,userId));
            dispatch(authLogOut((expireTime.getTime()-new Date().getTime())/1000))
        }
        }

    }
}