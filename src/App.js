import './App.css';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';

function App() {
  const [phase, setPhase] = useState('order');

  return (
    <Container>
      <OrderDetailsProvider>
        {phase === 'order' && <OrderEntry setPhase={setPhase} />}
        {phase === 'summary' && <OrderSummary setPhase={setPhase} />}
        {phase === 'confirmation' && <OrderConfirmation setPhase={setPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
