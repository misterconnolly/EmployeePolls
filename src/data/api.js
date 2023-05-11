import {
  _getUsers,
  _saveUser,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([getUsers(), getQuestions()]).then(    
    ([users, questions, authedUser]) => ({
      users,
      questions,
    })
  );
}

export function getUsers() {
    return _getUsers();
}

export function saveUser(info) {
  return _saveUser(info);
}

export function getQuestions() {
    return _getQuestions();
}

export function saveQuestion(info) {
    return _saveQuestion(info);
}

export function saveQuestionAnswer(info) {
   return _saveQuestionAnswer(info);
}
