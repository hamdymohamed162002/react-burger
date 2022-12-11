import * as actionType from '../actions/actionTypes';
import {updateObject} from'../utility'
const initialState = {
   tokenId:null,
   userId:null,
   error:null,
   loading:null,
   authPath:'/',
};

const authStart=(state,action)=>{
    return updateObject(state,{ error: null, loading: true } );

}
const authTimeOut=(state,action)=>{
    return updateObject(state,
        { userId: null,
         tokenId: null } );

}

const authSucces=(state,action)=>{
    return updateObject(state,{
        tokenId:action.authData.idToken,
        userId:action.authData.localId,
        error:null,
        loading:false
     })

}
const setAuthPath=(state,action)=>{
    return updateObject(state,{
        authPath:action.path
    })
}

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSucces(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGIUT:return authTimeOut(state,action);
        case actionType.SET_AUTH_REDIRECT_PATH :return setAuthPath(state,action);
        default:
            return state;
    }
};

export default reducer;