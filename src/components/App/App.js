import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../store/tasks/selectors';
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

const options = ['date', 'name'];

export const App = () => {
  const { isPending, data: tasks } = useSelector(tasksSelector);

  const addTask = useAction(addTaskRequest);
  const fetchTasks = useAction(fetchTasksRequest);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortValue, setSortValue] = useState('');

  const labels = useMemo(() => {
    const labelsSet = new Set();

    tasks.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        subtask.labels.forEach((label) => labelsSet.add(label));
      });
    });

    const result = [...labelsSet];
    result.sort();
    return result;
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
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

    const substring = searchText.toLowerCase().trim();

    const updatedTasksBySearchText = updatedTasksByLabel.reduce(
      (result, task) => {
        const updateSubTasks = task.subtasks.filter((subtask) =>
          subtask.title.toLowerCase().includes(substring)
        );

        task = {
          ...task,
          subtasks: updateSubTasks,
        };

        if (!task.subtasks.length) {
          task.title.toLowerCase().includes(substring) && result.push(task);
        } else {
          result.push(task);
        }

        return result;
      },
      []
    );

    sortValue.includes('name') &&
      updatedTasksBySearchText.sort((a, b) => a.title.localeCompare(b.title));

    return updatedTasksBySearchText;
  }, [searchText, selectedLabels, sortValue, tasks]);

  const handleSelectLabel = useCallback((e) => {
    const label = e.target.dataset.label;

    setSelectedLabels((prevSelectedLabels) => {
      if (!prevSelectedLabels.includes(label)) {
        return [...prevSelectedLabels, label];
      } else {
        return prevSelectedLabels.filter(
          (prevSelectedLabel) => prevSelectedLabel !== label
        );
      }
    });
  }, []);

  const handleChangeSearch = useCallback(
    (e) => setSearchText(e.target.value),
    []
  );

  const handleSortValue = useCallback((e) => setSortValue(e.target.value), []);

  useEffect(() => {
    if (!isPending) {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    setSelectedLabels((prevSelectedLabels) => {
      return prevSelectedLabels.filter((prevSelectedLabel) =>
        labels.includes(prevSelectedLabel)
      );
    });
  }, [labels]);

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
            <SortSelect name="tasks" id="tasks" onChange={handleSortValue}>
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
            {labels.map((label) => (
              <ItemLabel
                key={label}
                data-label={label}
                isSelected={selectedLabels.includes(label)}
                onClick={handleSelectLabel}
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
            onChange={handleChangeSearch}
            value={searchText}
            placeholder="Start typing here..."
          />
        </ActionsWrapper>

        {filteredAndSortedTasks.map((task) => (
          <Task task={task} key={task.createTime} />
        ))}
      </Wrapper>
    </>
  );
};
