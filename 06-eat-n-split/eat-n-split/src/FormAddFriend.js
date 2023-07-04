import Button from "./Button";
import { useState } from "react";

export default function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/48");

  const createFriendFromInput = (e) => {
    e.preventDefault();
    addFriend({
      name: name,
      image: avatar,
      balance: 0,
      id: crypto.randomUUID(),
    });
    setName("");
    setAvatar("");
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };
  return (
    <form className="form-add-friend" onSubmit={createFriendFromInput}>
      <label>🧑‍🤝‍🧑 Friend Name</label>
      <input type="text" value={name} onChange={updateName} />
      <label>🖼️ Image URL</label>
      <input type="text" value={avatar} onChange={updateAvatar} />
      <Button>Add Friend</Button>
    </form>
  );
}
