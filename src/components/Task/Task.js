import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSubTasks } from '../../store/subtasks/selectors';
import useAction from '../../hooks/useAction';
import { fetchSubTasksRequest } from '../../store/subtasks/actions';
import { SubTask } from '../SubTask/SubTask';
import {
  TaskContainer,
  ButtonContainer,
  TimeAndTitle,
  SubTasksContainer,
  TaskInfo,
} from './Task.style';

export const Task = ({ task }) => {
  const { createTime, title, id } = task;
  const fetchSubTasks = useAction(fetchSubTasksRequest);
  const { data, isPending } = useSelector(selectSubTasks);
  const [showTask, setShowTask] = useState(false);

  let currentTask = false;

  if (data.length) currentTask = id === data[0].taskId;

  const handlerSubTasks = (taskId) => {
    setShowTask((prev) => !prev);
    if (!currentTask) {
      fetchSubTasks(taskId);
    }
  };

  return (
    <TaskContainer>
      <TaskInfo>
        <TimeAndTitle>
          <span>Time: {createTime}</span>
          <br />
          <span>Title: {title}</span>
        </TimeAndTitle>
        <ButtonContainer>
          <button onClick={() => handlerSubTasks(id)}>
            {showTask ? 'Hide' : 'Show'} subtasks
          </button>
        </ButtonContainer>
      </TaskInfo>

      <SubTasksContainer>
        {isPending && <h2>Loading ...</h2>}
        {currentTask &&
          showTask &&
          data.map((subTaskData) => (
            <SubTask data={subTaskData} key={subTaskData.id} taskId={id} />
          ))}
      </SubTasksContainer>
    </TaskContainer>
  );
};
