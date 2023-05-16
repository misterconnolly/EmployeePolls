import { RECEIVE_DATA } from "../actions/shared";
import { ADD_QUESTION } from "../actions/questions";
import { ANSWER_QUESTION } from "../actions/answers";

export default function questions(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case RECEIVE_DATA:
      return action.questions;
    default:
      return state;
  }
}