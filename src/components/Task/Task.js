import React from 'react';
import { TaskContainer } from './Task.style';

export const Task = ({ task }) => {
  const { createTime, title } = task;

  return (
    <TaskContainer>
      <span>Time: {createTime}</span>
      <br />
      <span>Title: {title}</span>
    </TaskContainer>
  );
};
