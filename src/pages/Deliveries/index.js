/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import AddButton from '~/components/AddButton';
import Empty from '~/components/Empty';
import Modal from '~/components/Modal';

import {
  Container,
  SearchRow,
  SearchIcon,
  TableWrapper,
  Table,
  DeliverymanTd,
  StatusTd,
  PageNav,
  ActionsWrapper,
  ActionsIcon,
  ActionsMenu,
  Wrapper,
  DeliveryInfo,
  DateInfo,
  WithdrawalDate,
  DeliveryDate,
  Signature,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';
import formatDate from '~/utils/formatDate';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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

  function toggleMenu(deliveryId) {
    const formattedDeliveries = deliveries.map((delivery) => {
      if (delivery.id === deliveryId) {
        delivery.showActionsMenu = !delivery.showActionsMenu;
      } else {
        delivery.showActionsMenu = false;
      }
      return delivery;
    });

    setDeliveries(formattedDeliveries);
  }

  async function handleModal(deliveryId) {
    const deliveryFound = await deliveries.find(
      (delivery) => delivery.id === deliveryId
    );
    deliveryFound.formattedStartDate = formatDate(deliveryFound.start_date);
    deliveryFound.formattedEndDate = formatDate(deliveryFound.end_date);
    setSelectedDelivery(deliveryFound);
    setModalOpen(!modalOpen);
  }

  function handleEdit(delivery) {
    history.push({
      pathname: '/deliveries/edit',
      state: { delivery },
    });
  }

  async function handleDelete(deliveryId) {
    const confirmation = window.confirm(
      'Tem certeza que deseja apagar esta encomenda?'
    );

    if (confirmation === true) {
      try {
        await api.delete(`deliveries/${deliveryId}`);
        toast.success('Encomenda excluída com sucesso');
        loadDeliveries(page);
      } catch (err) {
        toast.error('Não foi possível excluir a encomenda');
      }
    }
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
                <ActionsWrapper>
                  <ActionsIcon
                    size={30}
                    onClick={() => toggleMenu(delivery.id)}
                  />
                  <ActionsMenu showActionsMenu={delivery.showActionsMenu}>
                    <li
                      onClick={() => {
                        handleModal(delivery.id);
                        delivery.showActionsMenu = false;
                      }}
                    >
                      <MdRemoveRedEye color="#8E5BE8" />
                      <span>Visualizar</span>
                      {modalOpen && (
                        <Modal open={modalOpen}>
                          <Wrapper>
                            <DeliveryInfo>
                              <strong>Informações da encomenda</strong>
                              <span>{`${selectedDelivery.recipient.street}, ${selectedDelivery.recipient.street_number}`}</span>
                              <span>{`${selectedDelivery.recipient.city} - ${selectedDelivery.recipient.state}`}</span>
                              <span>{selectedDelivery.recipient.zip_code}</span>
                            </DeliveryInfo>
                            <DateInfo>
                              <strong>Datas</strong>
                              <WithdrawalDate>
                                <span>Retirada: </span>
                                <span>
                                  {selectedDelivery.formattedStartDate ||
                                    'Pendente'}
                                </span>
                              </WithdrawalDate>
                              <DeliveryDate>
                                <span>Entrega: </span>
                                <span>
                                  {selectedDelivery.formattedEndDate ||
                                    'Pendente'}
                                </span>
                              </DeliveryDate>
                            </DateInfo>
                            <Signature>
                              <strong>Assinatura do destinatário</strong>
                              {selectedDelivery.signature ? (
                                <img
                                  src={selectedDelivery.signature.url}
                                  alt="Assinatura do destinatário"
                                />
                              ) : (
                                <span>
                                  Assinatura ainda não registrada no sistema
                                </span>
                              )}
                            </Signature>
                          </Wrapper>
                        </Modal>
                      )}
                    </li>
                    <li onClick={() => handleEdit(delivery)}>
                      <MdCreate color="#4D85EE" />
                      <span>Editar</span>
                    </li>
                    <li onClick={() => handleDelete(delivery.id)}>
                      <MdDeleteForever color="#DE3B3B" />
                      <span>Excluir</span>
                    </li>
                  </ActionsMenu>
                </ActionsWrapper>
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
