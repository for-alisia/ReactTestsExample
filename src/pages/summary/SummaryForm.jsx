import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const SummaryForm = ({ setPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>accept all the terms</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <div>
      <Form>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={tcChecked}
            onChange={(e) => setTcChecked(e.target.checked)}
            label={checkboxLabel}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!tcChecked}
          onClick={() => setPhase('confirmation')}
        >
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default SummaryForm;
