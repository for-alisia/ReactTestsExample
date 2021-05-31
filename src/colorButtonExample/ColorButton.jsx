import { useState } from 'react';

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
};

function ColorButton() {
  const [color, setColor] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? 'gray' : color }}
        onClick={() => setColor(newButtonColor)}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="enable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => {
          // @ts-ignore
          setDisabled(e.target.checked);
        }}
      />
      <label htmlFor="enable-button-checkbox">Disable button</label>
    </div>
  );
}

export default ColorButton;
