import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import NewMessage from '../../components/NewMessage/NewMessage';
import MessagesList from '../../components/MessagesList/MessagesList';
import './Forum.css'

import { UidContext } from '../../components/AppContext';

function Forum(props) {
  const uid = useContext(UidContext);
  
  // Si pas d'id de session on redirige vers la page de connexion.
  //if (!uid) {
  //  return <Navigate to='/login' replace/>;
  //}

  const url = 'http://localhost:4000/api/user/' + uid;
  const user = axios.get(url);

  return (
    <div>
      <Header user={user}/ >
      <div className="wrapper">
        <SideBar />
        <main className="main-content">
        <NewMessage user={user}/>
        <MessagesList userId={user} />
        </main>
      </div>
    </div>
  );
}

export default Forum;
