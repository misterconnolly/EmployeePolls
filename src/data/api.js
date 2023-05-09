import {
  _getUsers,
  _saveUser,
  _getQuestions,
  _saveQuestion,
  _saveAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
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

export function saveAnswer(info) {
   return _saveAnswer(info);
}