import React from 'react';
import './ForumList.css';

function ForumList({ isOpen, onClose}) {
  if (!isOpen) return null;

  return (
    <div className="forum-list-overlay">
      <div className="forum-list">
        <div className="header">
          <h2>Liste des Forum</h2>
          <button onClick={onClose}>x</button>
        </div>

      </div>
    </div>
  );
}

export default ForumList;
