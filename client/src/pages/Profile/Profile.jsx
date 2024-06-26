import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import MessagesList from '../../components/MessagesList/MessagesList';
import UserInfos from './UserInfos/UserInfos'
import './Profile.css'

import { UidContext } from '../../components/AppContext';

function Profile(props) {
  const uid = useContext(UidContext);

  if (!uid) {
    return <Navigate to='/' replace/>;
  }

  return (
    <div>
      <Header />
      <div className="wrapper">
        <SideBar />
        <main className="main-content">
          <UserInfos  />
          <MessagesList />
        </main>
      </div>
    </div>
  );
}

export default Profile;
