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
        style={{ backgroundColor: color }}
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
    </div>
  );
}

export default App;
