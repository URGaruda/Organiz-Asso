import React, { useState } from 'react';
import userImg from '../../assets/img/user-placeholder-image.png';
import './NewMessage.css'

function NewMessage(props) {
  const [messageContent, setMessageContent] = useState('');
  const [date, setDate] = useState('');

  function handleSubmit() {
    return;
  }


  return (
    <div className="new-message">
      <h3>Nouvelle publication</h3>
      <div className="info-user">
        <img src={userImg} alt="user" className="user-img"/>
        <p><b></b></p>
      </div>
      <div className="input-message">
        <textarea name="message" placeholder="Exprimez-vous..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} required></textarea>
        <button type="submit" onClick={handleSubmit}>Envoyer</button>
      </div>
    </div>
  );
}

export default NewMessage;
