import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { dispatch, budget, expenses, currency } = useContext(AppContext);

  const [newBudget, setNewBudget] = useState(budget);
  const [debouncedValue, setDebouncedValue] = useState(budget);

  // Calculate the total expenses
  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const debounceTimeout = useRef(null);

  const handleBudgetChange = () => {
    const value = Number(debouncedValue);

    // Check if the new budget exceeds 20,000
    if (value > 20000) {
      alert("The value cannot exceed 20,000");
      setNewBudget(budget); // Reset to the current budget value
      return;
    }

    // Check if the new budget is less than total expenses
    if (value < totalExpenses) {
      alert("The value cannot be less than the total expenses");
      setNewBudget(budget); // Reset to the current budget value
      return;
    }

    dispatch({
      type: "SET_BUDGET",
      payload: value,
    });
  }

  useEffect(() => {
    // Set a debounce timer to call handleBudgetChange
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleBudgetChange();
    }, 1000); // 1 second debounce time

    // Cleanup the timeout on unmount or value change
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    setDebouncedValue(event.target.value);
  }

  return (
    <div className='alert alert-secondary'>
      <span>Budget: {currency} {budget}</span>
      <input 
        type="number" 
        step="10" 
        value={debouncedValue} 
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Budget;
