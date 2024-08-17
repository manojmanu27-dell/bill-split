import React, { useState } from "react";
import UserView from "./UserView";
import UserAdd from "./UserAdd";
import CalaulateBill from "./CalaulateBill";
import Button from "../elements/Button";

const initialFriends = [
  {
    id: "c991b336-d19a-4c00-b253-41d25709b7f9",
    name: "You",
    image: "https://i.pravatar.cc/48?u=c991b336-d19a-4c00-b253-41d25709b7f9",
    balance: 0,
  },
];

export default function Users() {
  const [userList, setUserList] = useState(initialFriends);
  const [addUser, setAddUser] = useState(true);
  const [showCalculateForm, setShowCalculateForm] = useState(false);
  const [selectedUser, setSelecteduser] = useState({});
  const [billPayedUser, setBillPayedUser] = useState("");
  function handleAddUser(obj) {
    console.log("The object is", obj);
    setUserList((items) => [obj, ...items]);
    setAddUser(false);
  }

  function calculateBill(totalCost, name, percentage) {
    console.log("the total cost and id is", totalCost, name, percentage);
    let tempUsers = [...userList];
    setBillPayedUser(name);
    if (percentage) {
      handleSingleCalculation(tempUsers, percentage, totalCost);
    } else {
      handleMultipleCalculation(totalCost, tempUsers);
    }
    setSelecteduser({});
    setUserList(tempUsers);
    setShowCalculateForm(false);
  }

  function handleSingleCalculation(list, percent, totalBill) {
    list.forEach((obj) => {
      if (obj.name === selectedUser.name) {
        obj.balance = (1 - percent / 100) * totalBill;
      } else if (obj.name === "You") {
        obj.balance = (percent / 100) * totalBill;
      }
    });
  }

  function handleMultipleCalculation(totalCost, list) {
    let individualBill = Math.round(totalCost / list.length);
    list.forEach((item) => {
      item.balance = individualBill;
    });
    let splittedTotal = individualBill * list.length;
    if (splittedTotal !== totalCost) {
      list[0].balance = individualBill + (totalCost - splittedTotal);
    }
  }

  function showBillForm(item) {
    console.log("The selected object is", item);
    if (item.id === selectedUser.id) {
      setSelecteduser({});
      setShowCalculateForm(false);
      return;
    }
    setShowCalculateForm(true);
    setSelecteduser(item);
  }

  return (
    <>
      <div className="sidebar">
        <ul>
          {userList.map((item) => {
            return (
              <UserView
                key={item.id}
                user={item}
                billForm={showBillForm}
                userSelected={selectedUser}
                amtPayedUser={billPayedUser}
              />
            );
          })}
        </ul>
        {addUser ? (
          <>
            <UserAdd onUserAdd={handleAddUser} />
            <Button handleClick={() => setAddUser(false)}> close</Button>
          </>
        ) : (
          <Button handleClick={() => setAddUser((e) => !e)}> Add Friend</Button>
        )}
      </div>
      {showCalculateForm && (
        <CalaulateBill
          users={userList}
          handleCalculate={calculateBill}
          userSelected={selectedUser}
        />
      )}
    </>
  );
}
