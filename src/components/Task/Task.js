import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../hooks/useAction';
import { selectSubTasks } from '../../store/subTasks/selectors';
import { fetchSubTasksRequest } from '../../store/subTasks/actions';
import { SubTask } from '../SubTas/SubTask';
import { TaskContainer } from './Task.style';

export const Task = ({ task }) => {
  const { createTime, title, id } = task;
  const { loading, dataSubTasks } = useSelector(selectSubTasks);
  const fetchSubTasks = useAction(fetchSubTasksRequest);

  const filterSubTasks = dataSubTasks.filter(
    (dataSubTask) => dataSubTask.taskId === id
  );

  useEffect(() => {
    fetchSubTasks(id);
  }, []);

  if (!filterSubTasks.length) return null;

  return (
    <TaskContainer>
      <span>Time: {createTime}</span>
      <br />
      <span>Title: {title}</span>

      {loading && <h3>Loading...</h3>}

      {filterSubTasks.map((filterSubTask) => (
        <SubTask key={filterSubTask.id} data={filterSubTask} />
      ))}
    </TaskContainer>
  );
};
