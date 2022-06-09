import React from 'react';
import { SubTask } from '../SubTask/SubTask';
import {
  TaskContainer,
  TimeAndTitle,
  SubTasksContainer,
  TaskInfo,
  HeaderInfo,
} from './Task.style';

export const Task = ({ task }) => {
  const { createTime, title, id, subtasks } = task;

  return (
    <TaskContainer>
      <TaskInfo>
        <TimeAndTitle>
          <HeaderInfo>Time: {createTime}</HeaderInfo>
          <HeaderInfo>Title: {title}</HeaderInfo>
        </TimeAndTitle>
      </TaskInfo>

      <SubTasksContainer>
        {subtasks.map((subtask) => (
          <SubTask data={subtask} key={subtask.id} taskId={id} />
        ))}
      </SubTasksContainer>
    </TaskContainer>
  );
};
