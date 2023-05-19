import { getInitialData } from "../data/api";

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

        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveData(users, questions));
        })
    }
}