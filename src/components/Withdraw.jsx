import React, { useState } from 'react';
// import axios from '../api'; 
import axios from 'axios'; 
import '../css/Withdraw.css';

const Withdraw = ({ customer, setCustomer }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();

    // Convert amount to a number
    const withdrawAmount = parseFloat(amount);

    // Validation for withdrawal amount
    if (withdrawAmount <= 0 || withdrawAmount > customer.balance) {
      alert("Invalid amount. Please enter a valid amount.");
      return;
    }

    try {
      // Make API request to update the customer's balance on the server
      const response = await axios.post(`/record/${customer.accno}`, {
        recordType: 1,
        amount: withdrawAmount,
        date: date,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Assuming the response contains the updated customer data
      const updatedBalance = customer.balance - withdrawAmount;
      
      // Update the local state with the new balance
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        balance: updatedBalance,
      }));

      alert("Withdrawal successful!");

    } catch (err) {
      console.error("Error during withdrawal:", err);
      alert("Error during withdrawal. Please try again later.");
    }

    // Clear the form fields
    setAmount('');
    setDate('');
  };

  return (
    <div className="withdraw-container">
      <h2 className="withdraw-heading">Withdraw Amount</h2>
      <form className="withdraw-form" onSubmit={handleWithdraw}>
        {/* Hidden field for the account number */}
        <input type="hidden" name="accno" value={customer.accno} />
        
        {/* Input field for the amount */}
        <div className="form-group">
          <label className="form-label" htmlFor="amount">Amount to Withdraw:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            max={customer.balance}
            required
          />
        </div>

        
        {/* Submit button */}
        <button type="submit" className="withdraw-button">Withdraw</button>
      </form>
      
      {/* Display the current balance */}
      <div className="balance-display">
        <h3>Current Balance: ${customer.balance}</h3>
      </div>
    </div>
  );
};

export default Withdraw;
