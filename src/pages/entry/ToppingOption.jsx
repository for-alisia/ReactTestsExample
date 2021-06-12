import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    const count = event.target.checked ? 1 : 0;
    updateItemCount(name, count);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={name} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="checkbox" onChange={handleChange}></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
