import { saveQuestionAnswer } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const ANSWER_QUESTION = "ANSWER_QUESTION";

function answerQuestion(answer) {
  return {
    type: ANSWER_QUESTION,
    answer
  }
}

export function handleAnswerQuestion({authedUser, qid, answer}) {
    return (dispatch, getState) => {
      dispatch(showLoading());
      
      return saveQuestionAnswer({
        authedUser, qid, answer
      })
        .then((question) => dispatch(answerQuestion(answer)))
        .then(() => dispatch(hideLoading()));
    }
  };
  