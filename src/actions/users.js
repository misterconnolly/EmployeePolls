import { createUser } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_USERS = "RECIEVE_USERS";
export const ADD_USER = "ADD_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function handleAddUser({id, name, password, avatarURL}) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    return createUser({
      id,
      name,
      password,
      avatarURL,
    })
      .then((user) => dispatch(addUser(user)))
      .then(() => dispatch(hideLoading()));
  };
}