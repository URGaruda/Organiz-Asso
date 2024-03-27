import React, { useState } from 'react';
import CommentsList from '../../CommentsList/CommentsList';
import NewComment from '../../NewComment/NewComment';
import userImg from '../../../assets/img/user-placeholder-image.png';
import './Message.css'

function Message(props) {
  const handleProfile = () => { props.page('profile'); }

  const userName = props.userName;
  const messageContent = props.messageContent;
  const date = props.date;
  const comments = props.comments;
  const [isVisible, setIsVisible] = useState(false);
  const [isNewCommentOpen, setIsNewCommentOpen] = useState(false);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function toggleNewComment() {
    setIsNewCommentOpen(!isNewCommentOpen);
  }

  function handleCommentSubmit() {
    // Ajoutez ici le code pour traiter le commentaire soumis
    toggleNewComment();
  }


  return (
    <div>
      <div className="message-og">
        <div className="info-user">
          <img src={userImg} alt="user" className="user-img"/>
          <p onClick={handleProfile}><b>{userName}</b></p><em> - {date} </em>
        </div>
        <div className="message-content">
          <p>{messageContent}</p>
        </div>
        <div className="message-info">
          {comments.length > 0 && <button type="button" onClick={toggleVisibility}>{comments.length} commentaires</button>}
          <button type="button" onClick={toggleNewComment}>+ Ajouter un commentaire</button>
        </div>
      </div>
      <NewComment isOpen={isNewCommentOpen} onClose={toggleNewComment} onSubmit={handleCommentSubmit} userName={userName}/>
      {isVisible && <CommentsList page={props.page} comments={comments} />}
    </div>
  );
}

export default Message;
