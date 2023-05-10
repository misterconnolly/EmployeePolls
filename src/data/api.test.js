import { getUsers, saveQuestion, getQuestions, saveUser, saveAnswer } from "./api";
import { makeStringOfLength } from "../util/test";

describe("getUsers", () => {
  it("should return a promise", () => {
    const result = getUsers();
    expect(result).toBeInstanceOf(Promise);
  });

  it("should return list of users", async () => {
    const result = await getUsers();
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});

describe("saveUser", () => {
    const name = makeStringOfLength(10);
    const password = makeStringOfLength(10);
    const avatarURL = makeStringOfLength(10);

    it("should return a promise", () => {
      const result = saveUser({
        name,
        password,
        avatarURL,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should create user with id", async () => {
      const user = await saveUser({
        name,
        password,
        avatarURL,
      });
      expect(user.id.length).toBeGreaterThan(0);
      expect(user.name).toEqual(name);
      expect(user.password).toEqual(password);
      expect(user.avatarURL).toEqual(avatarURL);
    });
});

describe("getQuestions", () => {
    it("should return a promise", () => {
      const result = getQuestions();
      expect(result).toBeInstanceOf(Promise);
    });
  
    it("should return list of questions", async () => {
      const result = await getQuestions ();
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });

describe("saveQuestion", () => {
  const optionOneText = makeStringOfLength(10);
  const optionTwoText = makeStringOfLength(10);
  const author = makeStringOfLength(10);

  it("should return a promise", () => {
    const result = saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    expect(result).toBeInstanceOf(Promise);
  });

  it("should create question with id", async () => {
    const question = await saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    expect(question.id.length).toBeGreaterThan(0);
    expect(question.optionOne.text).toEqual(optionOneText);
    expect(question.optionTwo.text).toEqual(optionTwoText);
    expect(question.author).toEqual(author);
  });
});

describe("saveAnswer", () => {
    const authedUser = makeStringOfLength(10);
    const qid = makeStringOfLength(10);
    const answer = makeStringOfLength(10);

    it("should return a promise", () => {
      const result = saveAnswer({
        authedUser,
        qid,
        answer
      });
      expect(result).toBeInstanceOf(Promise);
    });
  });


