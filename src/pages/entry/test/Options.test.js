import { screen, render } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('displays image for each scoop from the server', async () => {
  render(<Options optionType="scoops" />);

  // find the images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping from the server', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = toppingImages.map((img) => img.alt);
  expect(altText).toEqual(['Hot fudge topping', 'Gummi bears topping']);
});
