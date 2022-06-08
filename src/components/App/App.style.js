import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 0 20px;
`;

export const Button = styled.button`
  height: 30px;
  width: 135px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 32px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 15px;
`;

export const ActionsTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
`;
