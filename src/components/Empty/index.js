import React from 'react';
import { MdLocalShipping } from 'react-icons/md';

import { Container, Content } from './styles';

export default function Empty() {
  return (
    <Container>
      <Content>
        <h1>Isso é tudo que temos por enquanto...</h1>
        <MdLocalShipping size={50} color="#7d40e7" />
      </Content>
    </Container>
  );
}
