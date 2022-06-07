import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/tasks/selectors';
import { addTaskRequest, fetchTasksRequest } from '../../store/tasks/actions';
import useAction from '../../hooks/useAction';
import GlobalStyle from '../GlobalStyle/GlobalStyle';
import { Loader } from '../Loader/Loader';
import { Task } from '../Task/Task';
import {
  Wrapper,
  Button,
  TitleContainer,
  Title,
  ActionsWrapper,
  ActionsTitle,
} from './App.style';

export const App = () => {
  const { isPending, data } = useSelector(selectTasks);
  const store = useSelector((store) => store);
  const addTask = useAction(addTaskRequest);
  const fetchTasks = useAction(fetchTasksRequest);

  console.log('store', store);

  useEffect(() => {
    if (!isPending) {
      fetchTasks();
    }
  }, []);

  if (isPending) return <Loader />;

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <TitleContainer>
          <Title>Task Manager</Title>
        </TitleContainer>

        <ActionsWrapper>
          <ActionsTitle>Tasks Actions</ActionsTitle>
          <Button onClick={addTask}>Create new task</Button>
        </ActionsWrapper>

        <ActionsWrapper>
          <ActionsTitle>Subtasks Actions</ActionsTitle>
        </ActionsWrapper>

        {data.map((dataTask) => (
          <Task task={dataTask} key={dataTask.createTime} />
        ))}
      </Wrapper>
    </>
  );
};
