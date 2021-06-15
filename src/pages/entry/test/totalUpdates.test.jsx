import { screen, render } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoop changes', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out from 0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check a subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when scoop changes', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

  // find and choose Hot fuge
  const hotFuge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.clear(hotFuge);
  userEvent.click(hotFuge);

  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // find and choose Gummi bears
  const gummiBears = await screen.findByRole('checkbox', { name: 'Gummi bears' });
  userEvent.clear(gummiBears);
  userEvent.click(gummiBears);

  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // uncheck Gummi bears
  userEvent.click(gummiBears);

  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at 0.00 and grand total updates on scoop added', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');
  });
  test('grand total updates on topping added', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    const hotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
    userEvent.click(hotFudge);

    expect(grandTotal).toHaveTextContent('1.50');
  });
  test('grand total updates on removing item', async () => {
    render(<OrderEntry />);

    const hotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
    userEvent.click(hotFudge);

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(hotFudge);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
