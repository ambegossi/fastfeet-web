/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import AddButton from '~/components/AddButton';
import Empty from '~/components/Empty';

import {
  Container,
  SearchRow,
  SearchIcon,
  TableWrapper,
  Table,
  DeliverymanTd,
  StatusTd,
  PageNav,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);

  async function loadDeliveries(pageSelected, q) {
    const response = await api.get('deliveries', {
      params: {
        page: pageSelected,
        q,
      },
    });

    response.data.map((delivery) => {
      if (!delivery.recipient) {
        delivery.recipient = {
          name: '-',
          state: '-',
          city: '-',
          street: '-',
          zip_code: '-',
          street_number: '-',
        };
      }

      return delivery;
    });

    setDeliveries(response.data);
  }

  useEffect(() => {
    loadDeliveries(page);
  }, [page]);

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  return (
    <Container>
      <h1>Gerenciador de encomendas</h1>
      <SearchRow>
        <Form>
          <SearchIcon size={19} color="#999" />
          <Input name="searchInput" placeholder="Buscar por encomendas" />
        </Form>
        <AddButton onClick={() => history.push('/deliveries/register')} />
      </SearchRow>
      {deliveries.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{`#${delivery.id}`}</td>
                <td>{delivery.recipient.name}</td>
                <DeliverymanTd>
                  <img
                    src={`https://ui-avatars.com/api/?name=${delivery.deliveryman.name.replace(
                      /\s/g,
                      '+'
                    )}`}
                    alt={delivery.deliveryman.name}
                  />
                  {delivery.deliveryman.name}
                </DeliverymanTd>
                <td>{delivery.recipient.city}</td>
                <td>{delivery.recipient.state}</td>
                <td>
                  {delivery.start_date &&
                  delivery.end_date === null &&
                  delivery.canceled_at === null ? (
                    <StatusTd status="retirada">
                      <span />
                      Retirada
                    </StatusTd>
                  ) : delivery.canceled_at ? (
                    <StatusTd status="cancelada">
                      <span />
                      Cancelada
                    </StatusTd>
                  ) : delivery.end_date ? (
                    <StatusTd status="entregue">
                      <span />
                      Entregue
                    </StatusTd>
                  ) : delivery.start_date === null ? (
                    <StatusTd status="pendente">
                      <span />
                      Pendente
                    </StatusTd>
                  ) : null}
                </td>
              </tr>
            ))}
          </Table>
        </TableWrapper>
      ) : (
        <Empty />
      )}
      <PageNav>
        {page > 1 ? (
          <MdKeyboardArrowLeft size={30} onClick={decrement} />
        ) : (
          <MdKeyboardArrowLeft size={30} color="#999" />
        )}
        <span>{page}</span>
        <MdKeyboardArrowRight size={30} onClick={increment} />
      </PageNav>
    </Container>
  );
}
