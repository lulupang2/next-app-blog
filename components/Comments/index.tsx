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

  return (
    <div className={styles.comments}>
      <h2 className={styles.heading}>댓글</h2>
      <ul className={styles.commentList}>
        {data
          .filter((comment: SelectComment) => !comment.parentId)
          .map((comment: SelectComment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              data={data}
              createComment={createComment}
              postId={postId}
            />
          ))}
      </ul>
      <CommentInput
        createComment={createComment}
        postId={postId}
        parentId={undefined}
      />
    </div>
  );
};

export default Comments;
