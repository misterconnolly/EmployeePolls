import { getInitialData } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

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

        return getInitialData().then(({ users, questions, authedUser }) => {
            dispatch(receiveData(users, questions));
            //dispatch(hideLoading());
        })
    }
}