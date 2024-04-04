import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Forum from './pages/Forum/Forum';
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/Admin';
import NotFound from './pages/NotFound/NotFound';

import { UidContext } from './components/AppContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';


function App() {
  const [uid, setUid] = useState(null);

  const getUserId  = async() => {
    await axios.get("http://localhost:4000/uid")
      .then((res) => setUid(res.data.userid))
      .catch((err) => console.log(err));
    };


  useEffect(() => {
    window.setTimeout(() => {
      //getUserId();
    }, 1000);
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Routes>
          <Route path="/" element = <Home/> />
          <Route path="/login" element = <Login/> />
          <Route path="/signup" element = <SignUp/> />
          <Route path="/forum/:id" element = <Forum/> />
          <Route path="/profile/:id" element = <Profile/> />
          <Route path="/admin" element = <Admin/> />
          <Route path="/*" element = <NotFound/> />
        </Routes>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
