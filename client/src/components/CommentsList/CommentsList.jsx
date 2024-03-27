import React, { useState } from 'react';
import Comment from './Comment/Comment'

function CommentsList(props) {
  const [commentsList, setCommentsList] = useState(props.comments);

  return (
    <div className="commentsList">
      {commentsList.map((comment, index) => (
        <Comment key={index} userName={comment.userName} commentContent={comment.messageContent} date={comment.date} comments={comment.comments} page={props.page} />
      ))}
    </div>
  );
}

export default CommentsList;
