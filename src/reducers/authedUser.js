import { SET_AUTHED_USER } from "../actions/authedUser";
import { REMOVE_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return  { ...state, authedUser: action.user };   
        case REMOVE_AUTHED_USER:
            return { ...state, authedUser: null }            
        default:
            return state;
    }
}