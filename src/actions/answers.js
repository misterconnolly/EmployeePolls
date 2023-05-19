import { saveQuestionAnswer } from "../data/api";

export const ANSWER_QUESTION = "ANSWER_QUESTION";

function answerQuestion({authedUser, qid, answer}) {
  return {
    type: ANSWER_QUESTION,
    authedUser: authedUser,
    qid: qid,
    answer: answer
  }
}

export function handleAnswerQuestion({authedUser, qid, answer}) {
    return (dispatch, getState) => {
      
      return saveQuestionAnswer({
        authedUser, qid, answer
      })
        .then((question) => dispatch(answerQuestion({authedUser, qid, answer})));
    }
  };
  