import { getUsers, saveQuestion, getQuestions, saveUser, saveAnswer } from "./api";

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
  it("should return a promise", () => {
    const result = saveUser({
      name: "somename",
      password: "somepassword",
      avatarURL: "url"
    });
    expect(result).toBeInstanceOf(Promise);
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
  it("should return a promise", () => {
    const result = saveQuestion({
      optionOneText: "123",
      optionTwoText: "123",
      author: "123",
    });
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("saveAnswer", () => {
    it("should return a promise", () => {
      const result = saveAnswer({
        authedUser: "user",
        qid: "id",
        answer: "answer"
      });
      expect(result).toBeInstanceOf(Promise);
    });
  });


