import React, { useState } from "react";
import Button from "../elements/Button";

export default function CalaulateBill({
  users = [],
  userSelected,
  handleCalculate,
}) {
  const [totalBill, setTotalBill] = useState(10);
  const [percentageShare, setPercentageShare] = useState("");
  const [paidPersonName, setPaidPersonName] = useState("You");
  const [splitEq, setSplitEq] = useState(false);
  if (users.length === 1) {
    return (
      <div className="users-none">
        <h2>Please add a user aside from you</h2>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("The vent is", e);
    handleCalculate(totalBill, paidPersonName, percentageShare);
  }
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>
        Split a bill with {userSelected.name}
        <br />
        <small>
          Do you want to split equally with all ?&nbsp;
          <input
            type="radio"
            id="yes"
            checked={splitEq}
            onChange={() => {
              setSplitEq(true);
              setPercentageShare("");
            }}
          />
          <label htmlFor="yes"> Yes &nbsp;</label>&nbsp;
          <input
            type="radio"
            id="no"
            checked={!splitEq}
            onChange={() => setSplitEq(false)}
          />
          <label htmlFor="no"> No</label>
        </small>
      </h2>
      <label htmlFor="bill-total">💰 Bill value</label>
      <input
        type="number"
        min={10}
        value={totalBill}
        onChange={(e) => setTotalBill(Number(e.target.value))}
        required
      />
      <label htmlFor="person-paid">😀 Who paid the bill</label>
      <select
        name="user-name"
        id="person-paid"
        value={paidPersonName}
        onChange={(e) => {
          setPaidPersonName(e.target.value);
        }}
      >
        <option value="You">You</option>
        <option value={userSelected.name}>{userSelected.name}</option>
      </select>
      {!splitEq && (
        <>
          <label htmlFor="percentage">🤝 Percentage Share</label>
          <input
            type="number"
            required
            min={1}
            max={100}
            name=""
            id="percentage"
            value={percentageShare}
            onChange={(e) => setPercentageShare(Number(e.target.value))}
          />
        </>
      )}
      <p>You pay {totalBill*percentageShare/100}</p>
      <Button config={{ type: "submit" }}>Calculate</Button>
    </form>
  );
}
