import { saveQuestion, saveAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

function addQuestion(tweet) {
  return {
    type: ADD_QUESTION,
    tweet
  }
}

export function handleAddQuestion(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((tweet) => dispatch(addQuestion(tweet)))
      .then(() => dispatch(hideLoading()));
  }
}


export function receiveQuestions(tweets) {
  return {
    type: RECEIVE_QUESTIONS,
    tweets,
  };
}

export function answerQuestion({ id, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveAnswer(info).catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(answerQuestion(info));
      alert("There was an error answering the question. Please try again.");
    });
  };
}


