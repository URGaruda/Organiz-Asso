import React, { useState } from 'react';
import Search from './Search/Search';
import NavigationPanel from './NavigationPanel/NavigationPanel';
import logo from '../../assets/img/logo-placeholder-image.png'
import './Header.css'

function Header(props) {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img"/>
        <h1><b>Organiz-Asso</b></h1>
      </div>
      <Search />
      <NavigationPanel user={props.user} />
    </header>
  );
}

export default Header;
