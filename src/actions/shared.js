// import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users"
import { receiveQuestions } from "./questions";
import { setAuthUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const AUTHED_ID = "dan_abramov";

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitialData().then(({ users, tweets }) => {
            dispatch(receiveUsers(users));
            // dispatch(receiveTweets(tweets));
            dispatch(setAuthUser(AUTHED_ID));
            dispatch(hideLoading());
        })
    }
}