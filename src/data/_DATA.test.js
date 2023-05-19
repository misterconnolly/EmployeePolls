import { _getUsers, _saveQuestionAnswer, _saveQuestion, _createUser } from './_DATA';
import { uniqueString } from "../util/test";

const getUser = async (id) => {
    const allUsers = await _getUsers();
    return allUsers[id];
}

const createTestUser = async () => {
    const name = uniqueString(7);
    const password = uniqueString(7);
    const avatarURL = uniqueString(7);

    const user = await _createUser({
      name: name,
      password: password,
      avatarURL: avatarURL,
    });

    return user;
}

const createTestQuestion = async (author) => {
    const optionOne = uniqueString(7);
    const optionTwo = uniqueString(7);

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
  const qid = uniqueString(10);
  const answer = uniqueString(10);

  const questionAnswer = {
    qid: qid,
    answer: answer,
  };
  await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(expectedRejectMessage);
});

it("should reject if missing qid", async () => {
  const authedUser = uniqueString(10);
  const answer = uniqueString(10);

  const questionAnswer = {
    authedUser: authedUser,
    qid: '',
    answer: answer,
  };
  await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(expectedRejectMessage);
});

it("should reject if missing answer", async () => {
  const authedUser = uniqueString(10);
  const qid = uniqueString(10);

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
    const expectedOptionOneText = uniqueString(10);
    const expectedOptionTwoText = uniqueString(10);
    const expectedAuthor = uniqueString(10);

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

describe('_createUser', () => {
    const expectedRejectMessage = "Please provide name, password, and avatarURL";
    const expectedName = uniqueString(10);
    const expectedPassword = uniqueString(10);
    const expectedAvatarURL = uniqueString(10);

    it("should return a promise", () => {
      const result = _createUser({
        name: expectedName,
        password: expectedPassword,
        avatarURL: expectedAvatarURL,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should create user with id", async () => {
      const newUser = await _createUser({
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
      await expect(_createUser(user)).rejects.toEqual(expectedRejectMessage);
    });

    it("should reject if missing password", async () => {
        const user = {
          name: expectedName,
          password: '',
          avatarURL: expectedAvatarURL,
        };
        await expect(_createUser(user)).rejects.toEqual(expectedRejectMessage);
      });

      it("should reject if missing avatarURL", async () => {
        const user = {
          name: expectedName,
          password: expectedPassword,
          avatarURL: '',
        };
        await expect(_createUser(user)).rejects.toEqual(expectedRejectMessage);
      });
});