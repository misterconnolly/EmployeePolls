import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureStore([]);

const users = {
    sarahedo: {
        id: 'sarahedo',
        password:'password123',
        name: 'Sarah Edo',
        avatarURL: 'https://avatars.dicebear.com/v2/gridy/8b1a2b8b949de96061098b2143a89b20.svg',
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
        }
  }

const authedUser = {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: ''
}

let store = mockStore({
    users: { users },
    authedUser: { authedUser },
  });

describe('Login rendered', () => {

    it("should render with given state from Redux store", () => {
      let view = renderer.create(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );

      expect(view).toMatchSnapshot();
    });

  });


  describe('Login screen', () => {

    it("should render username, password, and submit", () => {
      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );
      expect(screen.getByTestId("login-username")).toBeInTheDocument();
      expect(screen.getByTestId("login-password")).toBeInTheDocument();
      expect(screen.getByTestId("login-submit")).toBeInTheDocument();
    });

    it("should display error when bad login is attempted", () => {

      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      );

      expect(screen.queryByTestId("error-header")).not.toBeInTheDocument();

      var username = screen.getByTestId("login-username");
      var password = screen.getByTestId("login-password");
      var button = screen.getByTestId("login-submit");

      fireEvent.change(username, { target: { value: 'fakeusername' }})
      fireEvent.change(password, { target: { value: 'fakepassword' }})
      fireEvent.click(button);

      expect(screen.getByTestId("error-header")).toBeInTheDocument();
    });
    
  });