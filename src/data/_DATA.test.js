import { _getUsers, _saveQuestionAnswer, _saveQuestion, _saveUser } from './_DATA';
import { uniqueStringOfLength } from "../util/test";

const getUser = async (id) => {
    const allUsers = await _getUsers();
    return allUsers[id];
}

const createTestUser = async () => {
    const name = uniqueStringOfLength(7);
    const password = uniqueStringOfLength(7);
    const avatarURL = uniqueStringOfLength(7);

    const user = await _saveUser({
      name: name,
      password: password,
      avatarURL: avatarURL,
    });
    return user;
}

const createTestQuestion = async (author) => {
    const optionOne = uniqueStringOfLength(7);
    const optionTwo = uniqueStringOfLength(7);

    const question = await _saveQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: author,
      });
    return question;
};

describe("_saveQuestionAnswer", () => {
  const expectedRejectMessage = "Please provide authedUser, qid, and answer";
  const expectedAnswer = "optionTwo";

  it("should return a promise", async () => {
    const testUser = await createTestUser();
    const testQuestion = await createTestQuestion(testUser.id);

    const answer = _saveQuestionAnswer({
      authedUser: testUser.id,
      qid: testQuestion.id,
      answer: expectedAnswer,
    });
    expect(answer).toBeInstanceOf(Promise);
  });

   it("should create a new answer to a question", async () => {
    const testUser = await createTestUser();
    const testQuestion = await createTestQuestion(testUser.id);

    const result = await _saveQuestionAnswer({
      authedUser: testUser.id,
      qid: testQuestion.id,
      answer: expectedAnswer,
    });
    expect(result).toEqual(true);
    
    const reloadedUser = await getUser(testUser.id);
    expect(reloadedUser.id).toEqual(testUser.id);
    expect(reloadedUser.answers[testQuestion.id]).toEqual(expectedAnswer);
  });

  it("should reject if missing authedUser", async () => {
    const qid = uniqueStringOfLength(10);
    const answer = uniqueStringOfLength(10);

    const questionAnswer = {
      qid: qid,
      answer: answer,
    };
    await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(expectedRejectMessage);
  });

  it("should reject if missing qid", async () => {
    const authedUser = uniqueStringOfLength(10);
    const answer = uniqueStringOfLength(10);

    const questionAnswer = {
      authedUser: authedUser,
      qid: '',
      answer: answer,
    };
    await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(expectedRejectMessage);
  });

  it("should reject if missing answer", async () => {
    const authedUser = uniqueStringOfLength(10);
    const qid = uniqueStringOfLength(10);

    const questionAnswer = {
      authedUser: authedUser,
      qid: qid,
      answer: '',
    };
    await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(expectedRejectMessage);
  });
});

describe('_saveQuestion', () => {
    const expectedRejectMessage = "Please provide optionOneText, optionTwoText, and author";
    const expectedOptionOneText = uniqueStringOfLength(10);
    const expectedOptionTwoText = uniqueStringOfLength(10);
    const expectedAuthor = uniqueStringOfLength(10);

    it("should return a promise", () => {
        const result = _saveQuestion({
            optionOneText: expectedOptionOneText,
            optionTwoText: expectedOptionTwoText,
            author: expectedAuthor,
          });
        expect(result).toBeInstanceOf(Promise);
      });

    it("should create question with id", async () => {
      const question = await _saveQuestion({
        optionOneText: expectedOptionOneText,
        optionTwoText: expectedOptionTwoText,
        author: expectedAuthor,
      });
      expect(question.id.length).toBeGreaterThan(0);
      expect(question.optionOne.text).toEqual(expectedOptionOneText);
      expect(question.optionTwo.text).toEqual(expectedOptionTwoText);
      expect(question.author).toEqual(expectedAuthor);
    });

    it("should reject if missing option one", async () => {
      const question = {
        optionOneText: expectedOptionOneText,
        optionTwoText: "",
        author: expectedAuthor,
      };
      await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
    });

    it("should reject if missing option two", async () => {
      const question = {
        optionOneText: "",
        optionTwoText: expectedOptionTwoText,
        author: expectedAuthor,
      };
      await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
    });

    it("should reject if missing author", async () => {
      const question = {
        optionOneText: expectedOptionOneText,
        optionTwoText: expectedOptionTwoText,
        author: "",
      };
      await expect(_saveQuestion(question)).rejects.toEqual(expectedRejectMessage);
    });
});

describe('_saveUser', () => {
    const expectedRejectMessage = "Please provide name, password, and avatarURL";
    const expectedName = uniqueStringOfLength(10);
    const expectedPassword = uniqueStringOfLength(10);
    const expectedAvatarURL = uniqueStringOfLength(10);

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