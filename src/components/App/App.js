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
  LabelsContainer,
  ItemLabel,
  LabelTitle,
  InputSearch,
  SortContainer,
  SortLabel,
  SortSelect,
} from './App.style';

export const App = () => {
  const { isPending, data: tasks } = useSelector(selectTasks);
  const addTask = useAction(addTaskRequest);
  const fetchTasks = useAction(fetchTasksRequest);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortValue, setSortValue] = useState('');
  const options = ['date', 'name'];

  const selectLabels = (label) => {
    if (!selectedLabels.includes(label)) {
      setSelectedLabels((prev) => [...prev, label]);
    } else {
      setSelectedLabels((prev) => prev.filter((item) => item !== label));
    }
  };

  let allLabels = [];
  tasks.forEach((task) =>
    task.subtasks.forEach((subtask) =>
      subtask.labels.forEach(
        (label) => !allLabels.includes(label) && allLabels.push(label)
      )
    )
  );

  const filterTasks = (text, selectedLabels, sortValue) => {
    const updatedTasksByLabel = tasks.reduce((result, task) => {
      const updateSubTasks = task.subtasks.filter((subtask) =>
        selectedLabels.every((labelItem) => subtask.labels.includes(labelItem))
      );

      task = {
        ...task,
        subtasks: updateSubTasks,
      };

      if (task.subtasks.length) result.push(task);

      return result;
    }, []);

    const updatedTasksBySearchText = updatedTasksByLabel.reduce(
      (result, task) => {
        const updateSubTasks = task.subtasks.filter((subtask) =>
          subtask.title.toLowerCase().includes(text.toLowerCase().trim())
        );

        task = {
          ...task,
          subtasks: updateSubTasks,
        };

        if (!task.subtasks.length) {
          task.title.toLowerCase().includes(text.toLowerCase().trim()) &&
            result.push(task);
        } else {
          result.push(task);
        }

        return result;
      },
      []
    );

    sortValue === 'name' &&
      updatedTasksBySearchText.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredTasks(updatedTasksBySearchText);
  };

  useEffect(() => {
    filterTasks(searchText, selectedLabels, sortValue);
  }, [searchText, selectedLabels, sortValue]);

  useEffect(() => {
    if (!isPending) {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
    filterTasks(searchText, selectedLabels, sortValue);
  }, [tasks]);

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
          <SortContainer>
            <SortLabel htmlFor="tasks">Sort by:</SortLabel>
            <SortSelect
              name="tasks"
              id="tasks"
              onChange={(e) => setSortValue(e.target.value)}
            >
              {options.map((optnItem) => (
                <option key={optnItem}>{optnItem}</option>
              ))}
            </SortSelect>
          </SortContainer>
        </ActionsWrapper>

        <ActionsWrapper>
          <ActionsTitle>Subtasks Actions</ActionsTitle>
          <LabelsContainer>
            <LabelTitle>Labels:</LabelTitle>
            {allLabels.map((label) => (
              <ItemLabel
                select={selectedLabels.includes(label)}
                onClick={() => selectLabels(label)}
                key={label}
              >
                {label}
              </ItemLabel>
            ))}
          </LabelsContainer>
        </ActionsWrapper>

        <ActionsWrapper>
          <ActionsTitle>Search tasks and subtasks</ActionsTitle>
          <InputSearch
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder={'type text'}
          />
        </ActionsWrapper>

        {filteredTasks.map((task) => (
          <Task task={task} key={task.createTime} />
        ))}
      </Wrapper>
    </>
  );
};
