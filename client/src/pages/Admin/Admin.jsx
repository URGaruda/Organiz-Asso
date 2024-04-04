import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import ForumList from './components/ForumList/ForumList';
import UserList from './components/UserList/UserList';
import './Admin.css'

import { UidContext } from '../../components/AppContext';


function Admin(props) {
  const [isForumListOpen, setIsForumListOpen] = useState(false);
  const [isUserListOpen, setUserListOpen] = useState(false);

  const uid = useContext(UidContext);

  if (uid) {
    return <Navigate to='/' replace/>;
  }

  function toggleForumList() {
    setIsForumListOpen(!isForumListOpen);
  }
  function toggleUserList() {
    setUserListOpen(!isUserListOpen);
  }


  return (
    <div>
      <Header />
      <div className="wrapper">
        <SideBar />
        <main className="main-content">
          <h1>Panneau d'administration</h1>
          <div className="forum-list" onClick={toggleForumList}>
            <h3>Voir la liste des Forums</h3>
          </div>
          <div className="user-list" onClick={toggleUserList}>
            <h3>Voir la liste des utilisateurs</h3>
          </div>
          <ForumList isOpen={isForumListOpen} onClose={toggleForumList} />
          <UserList isOpen={isUserListOpen} onClose={toggleUserList} />
        </main>
      </div>
    </div>
  );
}

export default Admin;
