import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';

const OrderEntry = ({ setPhase }) => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setPhase('summary')}>Order</Button>
    </div>
  );
};

export default OrderEntry;
