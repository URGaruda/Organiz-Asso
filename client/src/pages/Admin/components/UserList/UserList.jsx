import React from 'react';
import './UserList.css';

function UserList({ isOpen, onClose, onSubmit}) {
  if (!isOpen) return null;

  return (
    <div className="user-list-overlay">
      <div className="user-list">
        <div className="header">
          <h2>Liste des Users</h2>
          <button onClick={onClose}>x</button>
        </div>

      </div>
    </div>
  );
}

export default UserList;
