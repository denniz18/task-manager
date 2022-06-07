import React from 'react';
import useAction from '../../hooks/useAction';
import { setDeleteSubTaskRequest } from '../../store/subtasks/actions';
import {
  SubTaskContainer,
  HeaderContent,
  LabelsWrapper,
  LabelText,
  Button,
} from './SubTask.style';

export const SubTask = ({ data, taskId }) => {
  const { labels, title, id } = data;

  const setDeleteSubTask = useAction(setDeleteSubTaskRequest);

  return (
    <SubTaskContainer>
      <HeaderContent>
        <span>Title: {title}</span>
        <Button onClick={() => setDeleteSubTask({ id, taskId })}>Remove</Button>
      </HeaderContent>
      <LabelsWrapper>
        {labels.map((label, index) => (
          <LabelText key={index}>{label}</LabelText>
        ))}
      </LabelsWrapper>
    </SubTaskContainer>
  );
};
