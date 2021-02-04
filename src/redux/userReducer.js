
import {LOGIN_USER,RELOGIN_USER, POST_USER,POST_ERROR,REMOVE_POST_USER,SIGN_IN_OUT} from "./types.js";
import storage from 'redux-persist/lib/storage'
import {appReducer} from "./rootReducer"
const boolstate = false
const initialState = {
    user : [],
    posts: [],
    error: [],
    sign: boolstate
}




export const userReducer = (state = initialState,action) =>{
    
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload}
        case SIGN_IN_OUT:
            return {...state, sign: action.payload}    
        case RELOGIN_USER:
            return {...state, user: []} 
        case REMOVE_POST_USER:
            return {...state, posts: []}      
        case POST_ERROR:
            return  {...state, error: action.payload} 
        case POST_USER:
            return {...state, posts: action.payload}   
        default:
            return state
    }
    
}
