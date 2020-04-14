import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, ButtonsWrapper } from './styles';

import history from '~/services/history';

export default function TopLine({ title, updateFunction, data }) {
  return (
    <Container>
      <h1>{title}</h1>
      <ButtonsWrapper>
        <button type="button" onClick={() => history.goBack()}>
          <MdKeyboardArrowLeft size={20} color="#fff" />
          <span>VOLTAR</span>
        </button>
        <button type="submit" onClick={() => updateFunction(data)}>
          <MdCheck size={20} color="#fff" />
          <span>SALVAR</span>
        </button>
      </ButtonsWrapper>
    </Container>
  );
}

TopLine.propTypes = {
  title: PropTypes.string.isRequired,
  updateFunction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
