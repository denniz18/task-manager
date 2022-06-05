import styled from 'styled-components';

export const SubTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 5px;
  width: 350px;
  margin-top: 5px;
  font-size: 14px;
  margin: 0 auto;
`;

export const LabelsWrapper = styled.div`
  display: flex;
  margin: 3px 0;
  justify-content: center;
`;

export const LabelText = styled.span`
  border: 1px solid gray;
  border-radius: 3px;
  margin-right: 3px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  background-color: pink;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 60px;
`;
