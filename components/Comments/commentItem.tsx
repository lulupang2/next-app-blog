'use client';
import React, { useState } from 'react';
import styles from './comments.module.css';
import { InsertComment, SelectComment } from '@/db/schema';
import CommentInput from './commentInput';

type CommentItemProps = {
  comment: SelectComment;
  data: SelectComment[];
  createComment: (data: InsertComment) => Promise<void>;
  postId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  data,
  createComment,
  postId,
}) => {
  const replies = data.filter((c) => c.parentId === comment.id);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <li className={styles.commentItem}>
      <p className={styles.commentContent}>
        <span className={styles.commentId}>{comment.id}.</span>{' '}
        {comment.contents}
      </p>
      <div className={styles.commentInfo}>
        <p className={styles.commentDetails}>
          <span className={styles.commentAuthor}>작성자: {comment.name}</span> -{' '}
          <span className={styles.commentDate}>
            {new Date(comment.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </p>

        <button onClick={toggleReplyForm} className={styles.replyButton}>
          Reply
        </button>
      </div>
      {showReplyForm && (
        <CommentInput
          createComment={createComment}
          postId={postId}
          parentId={comment.id}
        />
      )}
      {replies.length > 0 && (
        <ul className={styles.replyList}>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              data={data}
              createComment={createComment}
              postId={postId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
