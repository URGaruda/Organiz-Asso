import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

  return (
    <div className="fond">
      <div className="rectangle">
        <h2>Organiz-Asso</h2>
        <div className="buttons">
          <Link to="/login">Connexion</Link>
          <Link to="/signup">Enregistrement</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
