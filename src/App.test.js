import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import AddUserBtn from "./components/header/AddUserBtn";


// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

// renders <App /> with a button with text.

it('renders <App /> and result isDefined.', () => {
    let result = render(<App />);
    expect(result).toBeDefined();
    
});

it('renders <App /> with a button with text.', () => {
    let result = render(<App />);
    let query  = screen.getByText('Add New User');
    
    expect(query).toBeDefined();
});

it('renders <App /> with a button with given testId', () => {
    let result = render(<App />);
    let query  = screen.getByTestId("add-user-btn");
    expect(query).toBeDefined();
});
