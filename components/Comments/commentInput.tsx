'use client';
import React, { useState } from 'react';
import styles from './comments.module.css';
import { InsertComment } from '@/db/schema';

type CommentInputProps = {
  createComment: (data: InsertComment) => Promise<void>;
  postId: string;
  parentId: number | undefined;
};

const CommentInput: React.FC<CommentInputProps> = ({
  createComment,
  postId,
  parentId,
}) => {
  const [name, setName] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: InsertComment = {
      name,
      postId,
      contents: newComment,
      parentId,
    };

    setNewComment('');
    setName('');

    await createComment(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className={styles.input}
        required
      />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className={styles.textarea}
        placeholder="Your comment"
        required
      />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default CommentInput;
