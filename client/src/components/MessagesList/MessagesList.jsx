import React, { useState } from 'react';
import Message from './Message/Message'
import './MessagesList.css'

function MessagesList(props) {
  const [messageList, setMessageList] = useState([
    {userName:'Axel', messageContent: 'Message 1', date: '15 feb 2024', comments: [
      {userName:'Salut', messageContent: 'Commentaire 1', date: '15 feb 2024', comments: [
        {userName:'Salut', messageContent: 'Commentaire 1.1', date: '15 feb 2024', comments: []}
      ]},
      {userName:'Salut', messageContent: 'Commentaire 2', date: '15 feb 2024', comments: []}
    ]},
    {userName:'Axel', messageContent: 'Message 2', date: '15 feb 2024', comments: []}
  ]);

  return (
    <div className="message-list">
      <h3>Publications récentes</h3>
      {messageList.map((message, index) => (
        <Message key={index} userName={message.userName} messageContent={message.messageContent} date={message.date} comments={message.comments} page={props.page} />
      ))}
    </div>
  );
}

export default MessagesList;
