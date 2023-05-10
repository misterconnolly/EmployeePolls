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



