import React from 'react';
import Navigation from './Navigation';
import { BrowserRouter as Router } from "react-router-dom";
import { uniqueString } from '../util/test';
import { render, screen } from '@testing-library/react';

describe("Navigation", () => {

  it("should render username and avatarURL when passed in props", () => {
    const username = uniqueString(10);
    const avatarURL = uniqueString(10);
  
    const user = {
      id: username,
      avatarURL: avatarURL,
    };

    render(
      <Router>
        <Navigation loggedInUser={user} />
      </Router>
    );

    const avatarImage = screen.getByTestId("avatar-image");
    expect(avatarImage).toHaveProperty("src", "http://localhost/" + avatarURL);
    expect(screen.getByTestId("logged-in-username").textContent).toBe(username);
  });

  it("should render when a user is passed in props", () => {
    const view = render(
      <Router>
        <Navigation loggedInUser={{ id: "id", name: "name", avatarURL: "avatarURL" }} />
      </Router>
    );
    expect(view).toMatchSnapshot("logged-in");

    expect(screen.getByTestId("avatar-image")).toBeInTheDocument();

    expect(screen.getByText('Employee Polls')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it("should render when props are empty", () => {
    const view = render(
        <Router>
          <Navigation />
        </Router>
      );
    expect(view).toMatchSnapshot("no-login");

    expect(screen.queryByText("avatar-image")).not.toBeInTheDocument();

    expect(screen.queryByText('Employee Polls')).not.toBeInTheDocument();
    expect(screen.queryByText('New')).not.toBeInTheDocument();
    expect(screen.queryByText('Leaderboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();    
  }); 

});

