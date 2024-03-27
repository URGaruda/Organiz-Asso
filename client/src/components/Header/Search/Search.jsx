import React, { useState } from 'react';
import './Search.css'

function Search(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function handleSearch(){
    return;
  }

  return (
      <div className="search">
        <input type="text" placeholder=" 🔎 Recherche..." required/>
        <button type="submit" onClick={handleSearch}>Rechercher</button>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
  );
}

export default Search;
