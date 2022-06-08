import React, { useEffect, useState, useRef } from 'react';
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
  LabelsContainer,
  ItemLabel,
  LabelTitle,
} from './App.style';

export const App = () => {
  const { isPending, data: tasks } = useSelector(selectTasks);
  const store = useSelector((store) => store);
  const addTask = useAction(addTaskRequest);
  const fetchTasks = useAction(fetchTasksRequest);
  const [filterTasks, setFilterTasks] = useState([]);
  const [selectLabels, setSelectLabels] = useState([]);
  const labelsRef = useRef([]);

  const handlerSelectLabels = (label) => {
    if (!labelsRef.current.includes(label)) {
      labelsRef.current.push(label);
      setSelectLabels((prev) => [...prev, label]);
    } else {
      labelsRef.current = [
        ...labelsRef.current.filter((itemLabel) => itemLabel !== label),
      ];
      setSelectLabels((prev) => prev.filter((item) => item !== label));
    }
    handleFilterTasksByLable(labelsRef.current, filterTasks);
  };

  const handleFilterTasksByLable = (labels, paramTasks) => {
    console.log({ labels, paramTasks });
    // if (!labels.length) {
    //   console.log('here', tasks);
    //   setFilterTasks(tasks);
    // }

    const updateTasks = paramTasks.reduce((result, task) => {
      const updateSubTasks = task.subtasks.filter((subtask) =>
        labels.every((labelItem) => subtask.labels.includes(labelItem))
      );

      task = {
        ...task,
        subtasks: updateSubTasks,
      };

      if (task.subtasks.length) result.push(task);

      return result;
    }, []);

    setFilterTasks(updateTasks);
  };

  let labelsArray = [];
  tasks.forEach((task) =>
    task.subtasks.forEach((subtask) =>
      subtask.labels.forEach(
        (label) => !labelsArray.includes(label) && labelsArray.push(label)
      )
    )
  );

  console.log('store', store);
  console.log('labelsRef.current', labelsRef.current);

  useEffect(() => {
    if (!isPending) {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    setFilterTasks(tasks);
    if (!labelsRef.current.length) {
      setFilterTasks(tasks);
    }
  }, [tasks, labelsRef.current]);

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
          <LabelsContainer>
            <LabelTitle>Labels:</LabelTitle>
            {labelsArray.map((label) => (
              <ItemLabel
                select={selectLabels.includes(label)}
                onClick={() => handlerSelectLabels(label)}
                key={label}
              >
                {label}
              </ItemLabel>
            ))}
          </LabelsContainer>
        </ActionsWrapper>

        {filterTasks.map((task) => (
          <Task task={task} key={task.createTime} />
        ))}
      </Wrapper>
    </>
  );
};
