import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('red');
  const newButtonColor = color === 'red' ? 'blue' : 'red';

  return (
    <div>
      <button style={{ backgroundColor: color }} onClick={() => setColor(newButtonColor)}>
        Change to {newButtonColor}
      </button>
    </div>
  );
}

export default App;
