import React, { useState } from 'react';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [creditCard, setCreditCard] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(null); // null = no input yet

  const formatCreditCardNumber = (value) => {
    const sanitized = value.replace(/\D/g, '');
    const formatted = sanitized.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    return formatted;
  };

  const validateCreditCard = (value) => {
    const formatted = formatCreditCardNumber(value);
    setCreditCard(formatted);

    const plainValue = formatted.replace(/\s/g, '');

    if (plainValue.length < 13 || plainValue.length > 19) {
      setMessage('❌ Credit Card Number must be between 13 and 19 digits.');
      setIsValid(false);
    } else if (!validator.isCreditCard(plainValue)) {
      setMessage('❌ Enter a valid Credit Card Number.');
      setIsValid(false);
    } else {
      setMessage('✅ Valid Credit Card Number!');
      setIsValid(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Credit Card Validation</h2>

          <div className="form-group">
            <label htmlFor="creditCardInput">Enter Credit Card Number:</label>
            <input
              type="text"
              className="form-control"
              id="creditCardInput"
              placeholder="1234 5678 9012 3456"
              maxLength="23"
              value={creditCard}
              onChange={(e) => validateCreditCard(e.target.value)}
            />
          </div>

          {message && (
            <div className={`mt-3 ${isValid ? 'text-success' : 'text-danger'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
