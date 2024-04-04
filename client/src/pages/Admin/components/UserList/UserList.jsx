import React, { useState, useEffect } from 'react';
import UserInfos from './UserInfos/UserInfos';
import axios from 'axios';
import './UserList.css';

function UserList({ isOpen, onClose, onSubmit}) {
  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    await axios.get('http://localhost:4000/api/user')
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  }


  useEffect(() => {
  const timer = setTimeout(() => {
    getUserList();
  }, 800);

  return () => clearTimeout(timer);
}, []);


  if (!isOpen) return null;

  return (
    <div className="user-list-overlay">
      <div className="user-list-container">
        <div className="user-list-header">
          <h2>Liste des utilisateurs</h2>
          <button onClick={onClose}>x</button>
        </div>
        {userList.map((user, index) => (
          <UserInfos key={index} user={user} getUser={getUserList} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
