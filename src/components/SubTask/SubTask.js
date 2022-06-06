import React from 'react';
import useAction from '../../hooks/useAction';
import { deleteSubTaskRequest } from '../../store/subTasks/actions';
import {
  SubTaskContainer,
  HeaderContent,
  LabelsWrapper,
  LabelText,
  Button,
} from './SubTask.style';

export const SubTask = ({ data, taskId }) => {
  const { labels, title, id } = data;
  const deleteSubTask = useAction(deleteSubTaskRequest);

  return (
    <SubTaskContainer>
      <HeaderContent>
        <span>Title: {title}</span>
        <Button onClick={() => deleteSubTask({ id, taskId })}>Remove</Button>
      </HeaderContent>
      <LabelsWrapper>
        {labels.map((label, index) => (
          <LabelText key={index}>{label}</LabelText>
        ))}
      </LabelsWrapper>
    </SubTaskContainer>
  );
};
