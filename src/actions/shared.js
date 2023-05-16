import { getInitialData } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setAuthedUser } from "./authedUser";

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveData(users, questions) {
    return {
      type: RECEIVE_DATA,
      users,
      questions,
    };
  }

export function handleInitialData () {
    return (dispatch) => {
        //dispatch(showLoading());

        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveData(users, questions));

            /// TODO: Remove after devlopment
            dispatch(setAuthedUser(users[Object.keys(users)[0]]));
            
            //dispatch(hideLoading());
        })
    }
}