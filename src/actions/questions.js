import { saveQuestion } from "../data/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion({optionOneText, optionTwoText, author}) {
  return (dispatch, getState) => {
    
    return saveQuestion({
      optionOneText, optionTwoText, author
    })
      .then((question) => dispatch(addQuestion(question)));
  }
}

export function receiveQuestions(tweets) {
  return {
    type: RECEIVE_QUESTIONS,
    tweets,
  };
}

