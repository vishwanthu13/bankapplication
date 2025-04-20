import React, { useState } from 'react';
import '../css/Deposit.css'; // Import the CSS file
import axios from 'axios';
const Deposit = ({ customer, setCustomer }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Convert amount to a number
    const depositAmount = parseFloat(amount);

    // Validation for deposit amount
    if (depositAmount <= 0) {
      alert("Invalid amount. Please enter a valid amount.");
      return;
    }

    try {
      // Make API request to update the customer's balance on the server
      const response = await axios.post(`/record/${customer.accno}`, {
        recordType: 2,
        amount: depositAmount,
        date: date,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming the response contains the updated customer data
      const updatedBalance = customer.balance + depositAmount;

      // Update the local state with the new balance
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        balance: updatedBalance,
      }));

      alert("Deposit successful!");

    } catch (err) {
      console.error("Error during deposit:", err);
      alert("Error during deposit. Please try again later.");
    }

    // Clear the form fields
    setAmount('');
    setDate('');
  };

  return (
    <div className="deposit-container">
      <h2>Deposit Amount</h2>
      <form onSubmit={handleDeposit}>
        <input type="hidden" name="accno" value={customer.accno} />
        <div>
          <label htmlFor="amount">Amount to Deposit:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
        </div>

        <button type="submit">Deposit</button>
      </form>
      <h3>Current Balance: ${customer.balance}</h3>
    </div>
  );
};

export default Deposit;
