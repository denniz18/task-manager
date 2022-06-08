import React from 'react';
import { SubTask } from '../SubTask/SubTask';
import {
  TaskContainer,
  TimeAndTitle,
  SubTasksContainer,
  TaskInfo,
} from './Task.style';

export const Task = ({ task }) => {
  const { createTime, title, id, subtasks } = task;

  return (
    <TaskContainer>
      <TaskInfo>
        <TimeAndTitle>
          <span>Time: {createTime}</span>
          <br />
          <span>Title: {title}</span>
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
