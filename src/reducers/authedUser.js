import { SET_AUTHED_USER } from "../actions/authedUser";
import { REMOVE_AUTHED_USER } from "../actions/authedUser";

const sanitizeAuthedUser = (user) => {
    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarUrl,
    };
  };

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return sanitizeAuthedUser(action.user);   
        case REMOVE_AUTHED_USER:
            return null           
        default:
            return state;
    }
}