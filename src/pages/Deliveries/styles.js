import styled from 'styled-components';
import { darken } from 'polished';
import { MdSearch, MdMoreHoriz } from 'react-icons/md';

const handleStatusBgColor = (status) => {
  switch (status) {
    case 'retirada':
      return '#BAD2FF';
    case 'cancelada':
      return '#FAB0B0';
    case 'entregue':
      return '#DFF0DF';
    case 'pendente':
      return '#F0F0DF';
    default:
      return null;
  }
};

const handleStatusColor = (status) => {
  switch (status) {
    case 'retirada':
      return '#4D85EE';
    case 'cancelada':
      return '#DE3B3B';
    case 'entregue':
      return '#2CA42B';
    case 'pendente':
      return '#C1BC35';
    default:
      return null;
  }
};

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const SearchRow = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    background-color: #fff;
    width: 237px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    input {
      border: none;
      width: 160px;
      color: ${darken(0.4, '#999')};

      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const SearchIcon = styled(MdSearch)`
  margin: 0 5px 0 15px;
`;

export const TableWrapper = styled.div`
  height: 100%;
`;

export const Table = styled.div`
  tr {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 30px;

    &:not(:first-child) {
      background-color: #ffffff;
      color: #666666;
      height: 57px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    th {
      margin: 30px 0;
    }

    td:first-child,
    th:first-child {
      width: 100px;
      text-align: left;
    }

    td:not(:first-child):not(:last-child),
    th:not(:first-child):not(:last-child) {
      width: 200px;
      text-align: left;
    }
  }
`;

export const DeliverymanTd = styled.td`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;

export const StatusTd = styled.div`
  background-color: ${(props) => handleStatusBgColor(props.status)};

  color: ${(props) => handleStatusColor(props.status)};

  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  width: 115px;
  height: 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    height: 12px;
    width: 12px;
    background-color: ${(props) => handleStatusColor(props.status)};
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
  }
`;

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    font-size: 20px;
    padding: 0 15px;
  }
`;

export const ActionsWrapper = styled.div`
  width: 30px;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

export const ActionsIcon = styled(MdMoreHoriz)`
  color: #c6c6c6;
`;
