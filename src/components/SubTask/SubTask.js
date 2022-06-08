import React from 'react';
import useAction from '../../hooks/useAction';
import { deleteSubtaskRequest } from '../../store/tasks/actions';
import {
  SubTaskContainer,
  HeaderContent,
  LabelsWrapper,
  LabelText,
  Button,
} from './SubTask.style';

export const SubTask = ({ data, taskId }) => {
  const { labels, title, id } = data;
  const deleteSubtask = useAction(deleteSubtaskRequest);

  return (
    <SubTaskContainer>
      <HeaderContent>
        <span>Title: {title}</span>
        <Button
          onClick={() => {
            deleteSubtask({ id, taskId });
          }}
        >
          Remove
        </Button>
      </HeaderContent>
      <LabelsWrapper>
        {labels.map((label, index) => (
          <LabelText key={index}>{label}</LabelText>
        ))}
      </LabelsWrapper>
    </SubTaskContainer>
  );
};
