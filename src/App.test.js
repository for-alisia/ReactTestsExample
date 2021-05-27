import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />);
  // find an element with a role of button and text "Change to blue"
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // expect the background color to be import { connect } from 'react-redux'
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  // expect background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // expect the button text to be changed 'Change to red"
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the buttons starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  // check that checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('disabling and enabling the button on confirm checkbox', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox');

  // Click on checkbox to disable the button
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // Click on checkbox to enable the button
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});
