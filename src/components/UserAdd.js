import React, { useState } from "react";
import Button from "../elements/Button";

export default function UserAdd({ onUserAdd}) {
  const [id, setId] = useState(crypto.randomUUID());
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("https://i.pravatar.cc/48?u=");
  const [editImage, setEditImage] = useState(false);
  const [appearence, setAppearence] = useState("user");
  function showAndHideImageUrl() {
    console.log("inside show and hide image url");
    setEditImage((e) => !e);
  }
  console.log("The id is",id)
  function handleSubmit(event) {
    console.log("on submit is called", id);
    event.preventDefault();

    const userDtls = {
      id,
      name: userName,
      image: `${userImage}${id}`,
      balance: 0,
    };
    onUserAdd(userDtls)
    console.log(userDtls);
  }

  function handleAppearence(type) {
    setAppearence(type);
    console.log("the appearnec is", appearence);
    if (appearence === "user") {
      setUserImage("https://api.dicebear.com/6.x/avataaars/svg?seed=");
    } else {
      setUserImage("https://i.pravatar.cc/48?u=");
    }
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="user-name">😃 Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <div className="user-profile">
        <img
          src={`${userImage}${id}`}
          alt="user avatar"
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
        />
        <div className="profile-select">
          <div className="human-section">
            <input
              type="radio"
              name="human"
              id="human"
              checked={appearence === "user"}
              onChange={() => handleAppearence("user")}
            />
            <label htmlFor="human"> User</label>
          </div>
          <div className="anime-avatar">
            <input
              type="radio"
              name="avatar"
              id="anime"
              checked={appearence === "avatar"}
              onChange={() => handleAppearence("avatar")}
            />
            <label htmlFor="anime"> Avatar</label>
          </div>
        </div>
      </div>
      {editImage && (
        <>
          {/* <label htmlFor="user-avatar">📷 Url</label> */}
          <input
            type="text"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
          />
        </>
      )}
      <div className={`${editImage ? "" : "image-section"}`}>
        {!editImage && (
          <Button handleClick={() => setId(crypto.randomUUID())}>
            ⚙ Image
          </Button>
        )}
        <Button
          config={{ class: "btn-primary" }}
          handleClick={() => showAndHideImageUrl()}
        >
          📝 Url
        </Button>
      </div>
      <Button config={{ class: "btn-warning", type: "submit" }}>Add</Button>
    </form>
  );
}
