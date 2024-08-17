import React from "react";

import Button from "../elements/Button";

export default function UserView({
  billForm,
  user,
  amtPayedUser,
  userSelected,
}) {
  return (
    <li className={`${user.id === userSelected.id ? "selected" : ""}`}>
      <img src={user.image} alt="User Avatar" />
      <h3>{user.name}</h3>
      {amtPayedUser === user.name ? (
        <p>You Owe nothing </p>
      ) : user.balance === 0 ? (
        <p className="green">No Bills to Pay</p>
      ) : amtPayedUser === "You" ? (
        <p className="red">Owes you {user.balance}</p>
      ) : (
        <p className="red">
          You Owe {user.balance} to {amtPayedUser}
        </p>
      )}
      {user.name !== "You" && (
        <Button handleClick={() => billForm(user)}>
          {!(user.id === userSelected.id) ? "select" : "close"}
        </Button>
      )}
    </li>
  );
}
