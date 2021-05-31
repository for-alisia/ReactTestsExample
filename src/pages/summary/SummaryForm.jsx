import React, { useState } from 'react';

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={false}
        aria-checked={false}
        name="conditions"
        id="conditions"
        onChange={(e) => {
          setDisabled(!e.target.checked);
        }}
      />
      <label htmlFor="conditions">Accept all the terms</label>
      <button disabled={disabled}>Confirm</button>
    </div>
  );
};

export default SummaryForm;
