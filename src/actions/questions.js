import { saveQuestion } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch, getState) => {
    // const { authedUser } = getState();

    dispatch(showLoading());
    
    return saveQuestion({
      optionOneText, optionTwoText, author
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  }
}


export function receiveQuestions(tweets) {
  return {
    type: RECEIVE_QUESTIONS,
    tweets,
  };
}

