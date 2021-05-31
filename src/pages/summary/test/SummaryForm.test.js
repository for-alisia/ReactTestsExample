import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('checkbox behavior', () => {
  test('initial conditions', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Button is disabled and checkbox is not checked
    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
  });
  test('when checkbox is checked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Accept the terms
    fireEvent.click(checkbox);
    // Button is enabled
    expect(button).toBeEnabled();
  });
  test('when checkbox is not checked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Not accept the terms
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    // Button is disabled
    expect(button).toBeDisabled();
  });
});
