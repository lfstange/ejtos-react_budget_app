
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencyList = () => {
  const { dispatch, expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
      return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';


  const onChangecurrency = (event) => {
    const currency = event.target.value;
    
    dispatch({
      type: "CHANGE_CURRENCY",
      payload: currency,
    });
  };


  return (
    <div className="alert alert-green">
      <select className=" currency-select" onChange={onChangecurrency}>
        <option value="USD">$ Dollar</option>
        <option value="POU">£ Pound</option>
        <option value="EUR">€ Euro</option>
        <option value="RUP">₹ Ruppee</option>
      </select>
    </div>
  );
};

export default CurrencyList;