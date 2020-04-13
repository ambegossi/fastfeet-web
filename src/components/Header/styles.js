import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 64px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 180px;
    height: 35px;
    padding: 0 20px;
    border-right: 1px solid #ddd;
  }
`;

export const NavigationOptions = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-left: 25px;

  a {
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    font-size: 15px;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 30px;

  span {
    font-weight: bold;
    color: #666;
  }

  button {
    border: none;
    color: #de3b3b;
    background: none;
    transition: color 0.2s;

    &:hover {
      color: ${darken(0.08, '#de3b3b')};
    }
  }
`;
