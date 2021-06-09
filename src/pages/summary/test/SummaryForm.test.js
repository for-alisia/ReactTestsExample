import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('checkbox behavior', () => {
  test('initial conditions', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Button is disabled and checkbox is not checked
    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
  });
  test('when checkbox is checked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Accept the terms
    userEvent.click(checkbox);
    // Button is enabled
    expect(button).toBeEnabled();
  });
  test('when checkbox is not checked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to accept all the terms' });
    const button = screen.getByRole('button', { name: 'Confirm' });
    // Not accept the terms
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    // Button is disabled
    expect(button).toBeDisabled();
  });

  test('popover responds to hover', async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    //popover appers upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/accept all the terms/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
