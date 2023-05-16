import { ANSWER_QUESTION } from "../actions/answers";
import { RECEIVE_DATA } from "../actions/shared";
import { ADD_USER } from "../actions/users";

export default function users(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: action.user
      }
      case ANSWER_QUESTION:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        }
    case RECEIVE_DATA:
      return action.users;
    default:
      return state;
  }
}