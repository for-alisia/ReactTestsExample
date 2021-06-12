import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

// @ts-ignore
const OrderDetailes = createContext();

// create custom hook to check whether we're inside a provider
const useOrderDetails = () => {
  const context = useContext(OrderDetailes);

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

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
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
      scoops: scoopsSubtotal,
      toppings: toppingSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountMaps = optionCounts[optionType];
      optionCountMaps.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    return [{ ...optionCounts, ...totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetailes.Provider values={value} {...props} />;
};

export { OrderDetailes, OrderDetailsProvider };
