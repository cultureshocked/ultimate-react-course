import FriendsList from "./FriendsList";
import Button from "./Button";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [addFriendVisible, setAddFriendVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([...initialFriends]);

  const toggleNewFriend = () => {
    setAddFriendVisible((visibility) => !visibility);
  };
  const addNewFriend = (newFriend) => {
    setFriends((currentFriends) => [...currentFriends, newFriend]);
    toggleNewFriend();
  };
  const setSelected = (friend) => {
    if (friend === selectedFriend) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend);
    }
  };
  const updateFriendBalance = (difference) => {
    setFriends((currentFriends) =>
      currentFriends.map((friend) => {
        return friend === selectedFriend
          ? { ...friend, balance: friend.balance + difference }
          : friend;
      })
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selected={selectedFriend}
          setSelected={setSelected}
        />
        {addFriendVisible ? <FormAddFriend addFriend={addNewFriend} /> : null}
        <Button onClickHandler={toggleNewFriend}>
          {addFriendVisible ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend ? (
        <FormSplitBill
          friend={selectedFriend}
          updateBalance={updateFriendBalance}
          key={selectedFriend.id}
        />
      ) : null}
    </div>
  );
}
