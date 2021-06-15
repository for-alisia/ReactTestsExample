import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

// @ts-ignore
const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within the OrderDetalsProvider');
  }

  return context;
};

const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountMaps = optionCounts[optionType];
      optionCountMaps.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};

export { OrderDetails, OrderDetailsProvider, useOrderDetails };
