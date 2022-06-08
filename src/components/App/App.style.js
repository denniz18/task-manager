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

export const LabelsContainer = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ItemLabel = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  border: 1px solid black;
  background-color: ${({ select }) => (select ? 'darkgray;' : 'gainsboro')};
  border-radius: 3px;
  margin-right: 5px;
  padding: 0 3px;
  cursor: pointer;
`;

export const LabelTitle = styled.span`
  font-size: 18px;
  text-decoration: underline;
  margin-right: 10px;
`;
