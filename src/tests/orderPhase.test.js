import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render App
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '1');
  const hotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudge);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order' });
  userEvent.click(orderButton);

  // check summary information
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 hot fudge')).toBeInTheDocument();
  // accept terms and click order button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', { name: 'I agree to accept all the terms' });
  userEvent.click(tcCheckbox);

  // confirm order on confirmation page
  const summaryOrderButton = screen.getByRole('button', { name: 'Confirm' });
  userEvent.click(summaryOrderButton);

  // click "new order" button on confirmation page
  const thankYouheader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouheader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrder = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrder);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Hot fudge' });
});
