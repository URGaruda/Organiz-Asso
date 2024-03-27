import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import userImg from '../../../assets/img/user-placeholder-image.png';
import './NavigationPanel.css'

function NavigationPanel(props) {
  const userId = props.userId;

  const handleLogout = async () => {
    await axios.delete('/api/user/logout', {}, { withCredentials: true, credentials: 'include' })
      .then((res) => window.location = '/')
      .catch((err) => console.log(err));
  }

  const handleProfil = () => {
    const profileUrl = `/profile/${userId}`;
    window.location = "/profile/0";
  }

  return (
    <div className="nav-container">
      <img src={userImg} alt="user" className="logo-img" />
      <div id="menu" className="nav">
        <div>
          <button className="navButton" onClick={ handleProfil }>Mon profil</button>
        </div>
        <div>
          <button className="navButton" onClick={ handleLogout }>Déconnexion</button>
        </div>
      </div>
    </div>
  );
}

export default NavigationPanel;
