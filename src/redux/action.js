import { LOGIN_USER,RELOGIN_USER, POST_USER, POST_ERROR,REMOVE_POST_USER,SIGN_IN_OUT } from "./types";
import "../components/api/api"
import { authAPI,usersAPI,interceptorAPI} from "../components/api/api";

export function userLogin(token){
    return async dispatch => {
        let response = await usersAPI.getUser(token) 
        
        dispatch({ type: LOGIN_USER, payload: response.data })
    }
}

export function postLogin(email,password){
    return async dispatch => {
        let responce = await authAPI.login(email,password)
        if ('error' in responce.data)
        {
            dispatch({ type: POST_ERROR, payload: responce.data.error })
        }
        else
        {
            await interceptorAPI.interceptor(responce)
            dispatch({ type: POST_USER, payload: responce.data.token })
            dispatch({ type: POST_ERROR, payload: [] })
        }

        
    }
}

export function SignIn(){
    return {
       type: SIGN_IN_OUT,
       payload: true
    }
}

export function SignOut(){
    return{       
        type: SIGN_IN_OUT, 
        payload: false 
    }
}

export function removeLogin(){
    return {
        type: RELOGIN_USER
    }
}



export function deletePost(){
    return {
        type: REMOVE_POST_USER
    }
}