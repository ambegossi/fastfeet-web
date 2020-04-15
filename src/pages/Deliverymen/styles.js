import styled from 'styled-components';
import { darken } from 'polished';

export const TableWrapper = styled.div`
  height: 550px;
`;

export const Table = styled.div`
  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    &:not(:first-child) {
      background-color: #fff;
      color: #666;
      height: 57px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    th {
      margin: 30px 0;
    }
  }
`;

export const ActionsMenu = styled.ul`
  position: absolute;
  width: 150px;
  left: calc(50% + 480px);
  margin-top: 40px;
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${(props) => (props.showActionsMenu ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 2px #00000026;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #00000026;
  }

  li {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 5px;
    border-bottom: 1px solid #f5f5f5;

    &:first-of-type {
      padding-top: 0px;
    }

    &:last-of-type {
      padding-bottom: 0px;
      border-bottom: none;
    }

    span {
      font-size: 16px;
      margin-left: 10px;
      color: #999;
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        color: ${darken(0.2, '#999')};
      }
    }
  }
`;

export const NameTd = styled.td`
  width: 150px;
  margin-left: 150px;
`;

export const EmailTd = styled.td`
  width: 200px;
  margin-left: 50px;
`;

export const AvatarTd = styled.td`
  margin-top: 5px;
  margin-left: 155px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
