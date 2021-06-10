import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      // @ts-ignore
      .catch((error) => {
        // catch error here...
      });
  }, [optionType]);

  // TODO: replace second 'ScoopOption' with ToppingOption
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ScoopOption;

  const optionItems = items.map((item) => (
    // @ts-ignore
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
