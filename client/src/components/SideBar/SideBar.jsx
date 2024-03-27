import React, { useState } from 'react';
import './SideBar.css'

function SideBar(props) {

  const [showForumSubmenu, setShowForumSubmenu] = useState(false);

  const toggleForumSubmenu = () => {
    setShowForumSubmenu(!showForumSubmenu);
  };

  return (
    <div className="block">
      <div className="sidebar">
        <button>Accueil</button>
        <button>Calendrier</button>
        <button onClick={toggleForumSubmenu}>Forums</button>
        {showForumSubmenu && (
          <div className="submenu">
            <button>{"> Membres"}</button>
            <button>{"> Administrateurs"}</button>
          </div>
        )}
        <button>Administration</button>
        <button>Contact</button>
      </div>
    </div>
  );
}

export default SideBar;
