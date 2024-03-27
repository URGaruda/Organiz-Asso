import React, { useState } from 'react';
import userImg from '../../../assets/img/user-placeholder-image.png'
import './UserInfos.css'

function UserInfos(props) {
  const userName = props.userName;
  const prenom = 'John';
  const nom = 'Doe';
  const dateCreation = '10-02-2019';
  const statut = 'Membre'
  const img = "img/user-placeholder-image.png";

  return (
    <div className="profile-info">
      <h3>Profil Utilisateur</h3>
      <div className="info">
        <div className="list">
          <p><strong>Prénom :</strong> {prenom}</p>
          <p><strong>Nom :</strong> {nom}</p>
          <p><strong>Login :</strong> {userName}</p>
          <p><strong>Date de création :</strong> {dateCreation}</p>
          <p><strong>Statut :</strong> {statut}</p>
        </div>
        <img src={userImg} alt="user" className="profile-user-img"/>
      </div>
    </div>
  );
}

export default UserInfos;
