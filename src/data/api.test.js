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

// describe("getQuestions", () => {
//     it("should return a promise", () => {
//       const result = getQuestions();
//       expect(result).toBeInstanceOf(Promise);
//     });
  
//     it("should return list of questions", async () => {
//       const result = await getQuestions ();
//       expect(Object.keys(result).length).toBeGreaterThan(0);
//     });
//   });


// describe("saveAnswer", () => {
//     const authedUser = makeStringOfLength(10);
//     const qid = makeStringOfLength(10);
//     const answer = makeStringOfLength(10);

//     it("should return a promise", () => {
//       const result = saveAnswer({
//         authedUser,
//         qid,
//         answer
//       });
//       expect(result).toBeInstanceOf(Promise);
//     });
//   });


