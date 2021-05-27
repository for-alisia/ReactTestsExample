import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('red');
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = color === 'red' ? 'blue' : 'red';

  return (
    <div>
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? 'gray' : color }}
        onClick={() => setColor(newButtonColor)}
      >
        Change to {newButtonColor}
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

export default App;
