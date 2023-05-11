import { RECEIVE_DATA } from "../actions/shared";
import { ADD_USER } from "../actions/users";

export default function users(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return state.concat([action.user]);
    case RECEIVE_DATA:
      return action.users;
    default:
      return state;
  }
}