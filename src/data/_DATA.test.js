import { _getUsers, _saveAnswer, _saveQuestion, _saveUser } from './_DATA';
import { makeStringOfLength } from "../util/test";

// describe("_saveAnswer", () => {
//   const expectedRejectMessage = "Please provide authedUser, qid, and answer";
//   const expectedAuthedUser = makeStringOfLength(10);
//   const expectedQid = makeStringOfLength(10);
//   const expectedAnswer = makeStringOfLength(10);

//   it("should return a promise", () => {
//     const result = _saveAnswer({
//       authedUser: expectedAuthedUser,
//       qid: expectedQid,
//       answer: expectedAnswer,
//     });
//     expect(result).toBeInstanceOf(Promise);
//   });

//   it("should reject if missing authedUser", async () => {
//     const question = {
//       authedUser: "",
//       qid: expectedQid,
//       answer: expectedAnswer,
//     };
//     await expect(_saveAnswer(question)).rejects.toEqual(expectedRejectMessage);
//   });

//   it("should reject if missing qid", async () => {
//     const question = {
//       authedUser: expectedAuthedUser,
//       qid: "",
//       answer: expectedAnswer,
//     };
//     await expect(_saveAnswer(question)).rejects.toEqual(expectedRejectMessage);
//   });

//   it("should reject if missing answer", async () => {
//     const question = {
//       authedUser: expectedAuthedUser,
//       qid: expectedQid,
//       answer: "",
//     };
//     await expect(_saveAnswer(question)).rejects.toEqual(expectedRejectMessage);
//   });
// });

// describe('_saveQuestion', () => {
//     const expectedRejectMessage = "Please provide optionOneText, optionTwoText, and author";
//     const expectedOptionOneText = makeStringOfLength(10);
//     const expectedOptionTwoText = makeStringOfLength(10);
//     const expectedAuthor = makeStringOfLength(10);

//     it("should return a promise", () => {
//         const result = _saveQuestion({
//             optionOneText: expectedOptionOneText,
//             optionTwoText: expectedOptionTwoText,
//             author: expectedAuthor,
//           });
//         expect(result).toBeInstanceOf(Promise);
//       });

//     it("should create question with id", async () => {
//       const question = await _saveQuestion({
//         optionOneText: expectedOptionOneText,
//         optionTwoText: expectedOptionTwoText,
//         author: expectedAuthor,
//       });
//       expect(question.id.length).toBeGreaterThan(0);
//       expect(question.optionOne.text).toEqual(expectedOptionOneText);
//       expect(question.optionTwo.text).toEqual(expectedOptionTwoText);
//       expect(question.author).toEqual(expectedAuthor);
//     });

//     it("should reject if missing option one", async () => {
//       const question = {
//         optionOneText: expectedOptionOneText,
//         optionTwoText: "",
//         author: expectedAuthor,
//       };
//       await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
//     });

//     it("should reject if missing option two", async () => {
//       const question = {
//         optionOneText: "",
//         optionTwoText: expectedOptionTwoText,
//         author: expectedAuthor,
//       };
//       await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
//     });

//     it("should reject if missing author", async () => {
//       const question = {
//         optionOneText: expectedOptionOneText,
//         optionTwoText: expectedOptionTwoText,
//         author: "",
//       };
//       await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
//     });
// });

describe('_saveUser', () => {
    const expectedRejectMessage = "Please provide name, password, and avatarURL";
    const expectedName = makeStringOfLength(10);
    const expectedPassword = makeStringOfLength(10);
    const expectedAvatarURL = makeStringOfLength(10);

    it("should return a promise", () => {
      const result = _saveUser({
        name: expectedName,
        password: expectedPassword,
        avatarURL: expectedAvatarURL,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should create user with id", async () => {
      const newUser = await _saveUser({
        name: expectedName,
        password: expectedPassword,
        avatarURL: expectedAvatarURL,
      });
      expect(newUser.id.length).toBeGreaterThan(0);
      expect(newUser.name).toEqual(expectedName);
      expect(newUser.password).toEqual(expectedPassword);
      expect(newUser.avatarURL).toEqual(expectedAvatarURL);

      const allUsers = await _getUsers();
      const storedUser = allUsers[newUser.id];

      expect(storedUser).toEqual(newUser);
    });

    it("should reject if missing name", async () => {
      const user = {
        name: '',
        password: expectedPassword,
        avatarURL: expectedAvatarURL,
      };
      await expect(_saveUser(user)).rejects.toEqual(expectedRejectMessage);
    });

    it("should reject if missing password", async () => {
        const user = {
          name: expectedName,
          password: '',
          avatarURL: expectedAvatarURL,
        };
        await expect(_saveUser(user)).rejects.toEqual(expectedRejectMessage);
      });

      it("should reject if missing avatarURL", async () => {
        const user = {
          name: expectedName,
          password: expectedPassword,
          avatarURL: '',
        };
        await expect(_saveUser(user)).rejects.toEqual(expectedRejectMessage);
      });
});