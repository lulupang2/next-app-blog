'use client';

import { InsertComment, SelectComment } from '@/db/schema';
import CommentInput from './commentInput';
import CommentItem from './commentItem';
import styles from './comments.module.css';
import { useState } from 'react';
type CommentsProps = {
  postId: string;
  data: SelectComment[];
  createComment: (data: InsertComment) => Promise<void>;
};

const Comments: React.FC<CommentsProps> = ({ postId, data, createComment }) => {
  const [comments, setComments] = useState<SelectComment[]>(data);
  const handleCreateComment = async (comment: InsertComment) => {
    const newComment = {
      ...comment,
    };
    await createComment(newComment);
    setComments((prev) => [...prev, comment as SelectComment]);
  };

  return (
    <div className={styles.comments}>
      <h2 className={styles.heading}>댓글</h2>
      <ul className={styles.commentList}>
        {comments
          .filter((comment: SelectComment) => !comment.parentId)
          .map((comment: SelectComment) => (
            <CommentItem
              createComment={handleCreateComment}
              key={comment.id}
              comment={comment}
              data={data}
              postId={postId}
            />
          ))}
      </ul>
      <CommentInput
        createComment={handleCreateComment}
        postId={postId}
        parentId={undefined}
      />
    </div>
  );
};

export default Comments;
