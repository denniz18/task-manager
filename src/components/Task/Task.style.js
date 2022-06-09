import styled from 'styled-components';

export const TaskContainer = styled.div`
  display: flex;
  border: 1px solid gray;
  border-radius: 5px;
  width: 800px;
  margin: 10px auto 0;
  flex-wrap: wrap;
`;

export const TaskInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 5px;
  background-color: gainsboro;
`;

export const TimeAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTasksContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const HeaderInfo = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;
