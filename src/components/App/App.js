import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/tasks/selectors';
import { addTaskRequest, fetchTasksRequest } from '../../store/tasks/actions';
import useAction from '../../hooks/useAction';
import GlobalStyle from '../GlobalStyle/GlobalStyle';
import { Loader } from '../Loader/Loader';
import { Task } from '../Task/Task';
import { Wrapper, Button, TitleContainer, TitleText } from './App.style';

export const App = () => {
  const { loading, dataTasks } = useSelector(selectTasks);
  const store = useSelector((store) => store);
  const addTask = useAction(addTaskRequest);
  const fetchTasks = useAction(fetchTasksRequest);

  console.log('store', store);

  useEffect(() => {
    if (!loading) {
      fetchTasks();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <TitleContainer>
          <TitleText>Task Manager</TitleText>
        </TitleContainer>

        <Button onClick={addTask}>Create random task</Button>

        {dataTasks.map((dataTask) => (
          <Task task={dataTask} key={dataTask.createTime} />
        ))}
      </Wrapper>
    </>
  );
};
