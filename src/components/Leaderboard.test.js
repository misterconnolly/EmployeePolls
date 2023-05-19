import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Leaderboard from './Leaderboard';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { dataTestId } from '../util/test';
import { uniqueString } from '../util/test';

const mockStore = configureStore([]);

describe("Leaderboard", () => {

  it("should display username and properly calculated scores", async () => {
    let store = mockStore({
      users: createUsersList([
        { id: "sarahedo", answers: 2, questions: 3 },
        { id: "bobedo", answers: 1, questions: 2 },
        { id: "samedo", answers: 0, questions: 0 },
        { id: "joeedo", answers: 3, questions: 3 }
      ]),
    });

    render(
      <Provider store={store}>
        <Router>
          <Leaderboard />
        </Router>
      </Provider>
    );

    let element = screen.getByTestId(dataTestId("sarahedo", "username"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("sarahedo");

    element = screen.getByTestId(dataTestId("bobedo", "username"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("bobedo");

    element = screen.getByTestId(dataTestId("samedo", "username"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("samedo");

    element = screen.getByTestId(dataTestId("joeedo", "username"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("joeedo");


    element = screen.getByTestId(dataTestId("sarahedo", "questionsCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("3");

    element = screen.getByTestId(dataTestId("bobedo", "questionsCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("2");

    element = screen.getByTestId(dataTestId("samedo", "questionsCount")); 
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("0");

    element = screen.getByTestId(dataTestId("joeedo", "questionsCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("3");


    element = screen.getByTestId(dataTestId("sarahedo", "answersCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("2");

    element = screen.getByTestId(dataTestId("bobedo", "answersCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("1");

    element = screen.getByTestId(dataTestId("samedo", "answersCount")); 
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("0");

    element = screen.getByTestId(dataTestId("joeedo", "answersCount"));
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("3");

  });
});



const createUsersList = (list = []) => {
  const result = list.map((u) => {
    return createUser(u.id, u.answers, u.questions);
  });
  return result;
};

const createUser = (id, answersCount, questionsCount) => {
  return {
    id: id,
    password: uniqueString(10),
    name: id,
    avatarURL: `https://avatars.dicebear.com/v2/gridy/${id}${uniqueString(10)}.svg`,
    answers: createAnswers(answersCount),
    questions: createQuestions(questionsCount),
  };
};

const createQuestions = (count) => {
  return count > 0 ? [...Array(count)].map((_, i) => uniqueString(10)) : [];
};

const createAnswers = (count) => {
  let answers = {};

  [...Array(count)].forEach((_, i) => {
    answers = {
      ...answers,
      [uniqueString(10)]: "optionOne",
    };
  });

  return answers;
};