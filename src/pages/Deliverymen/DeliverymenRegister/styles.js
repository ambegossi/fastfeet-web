import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin: 40px auto;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  padding: 20px 0;
  margin-top: 30px;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  input {
    height: 45px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 0 15px;
    color: #444444;
    font-size: 16px;
  }

  span {
    font-weight: bold;
    color: #444444;
    margin-bottom: 10px;
  }
`;

export const AvatarInput = styled.div`
  margin: 20px;
  align-self: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px dashed #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: opacity 0.2s;

  label {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
  }

  &:hover {
    background: #f5f5f5;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  input {
    display: none;
  }
`;

export const LineInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 25px 30px;
`;

export const EmptyAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: #ddd;
    margin-top: 10px;
    font-weight: bold;
  }
`;
