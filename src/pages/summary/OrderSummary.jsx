import React from 'react';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ setPhase }) => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Order Summary</h1>
      <h3>Scoops: {orderDetails.totals.scoops}</h3>

      <h3>Toppings: {orderDetails.totals.toppings}</h3>
      <SummaryForm setPhase={setPhase} />
    </div>
  );
};

export default OrderSummary;
