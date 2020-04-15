import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin: 40px auto;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 15px;
    color: #444;
    font-size: 16px;
  }

  span {
    font-weight: bold;
    color: #444;
    margin-bottom: 10px;
  }
`;

export const LineInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 25px 30px;
`;

export const AvatarInput = styled.div`
  align-self: center;
  margin-top: 20px;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    img {
      height: 148px;
      width: 148px;
      border-radius: 50%;
      border: 1px dashed #ddd;
      background: #f4effc;
    }

    input {
      display: none;
    }
  }
`;
