import React, { useState, useEffect } from 'react';
import {
  MdRemoveRedEye,
  MdDeleteForever,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';

import Empty from '~/components/Empty';

import {
  Container,
  ActionsWrapper,
  ActionsIcon,
  PageNav,
} from '~/pages/Deliveries/styles';

import { TableWrapper, Table, ActionsMenu } from '~/pages/Deliverymen/styles';

import { ModalTitle, ModalDescription, ProblemTd, IdTd } from './styles';

import api from '~/services/api';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState();

  async function loadProblems(pageSelected) {
    const response = await api.get('deliveries/problems', {
      params: {
        page: pageSelected,
      },
    });

    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems(page);
  }, [page]);

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  function toggleMenu(problemId) {
    const formattedProblems = problems.map((problem) => {
      if (problem.id === problemId) {
        problem.showActionsMenu = !problem.showActionsMenu;
      } else {
        problem.showActionsMenu = false;
      }

      return problem;
    });

    setProblems(formattedProblems);
  }

  async function handleModal(problemId) {
    const problemFound = problems.find((problem) => problem.id === problemId);
    setSelectedProblem(problemFound);
    setModalOpen(!modalOpen);
  }

  async function handleCancel(problemId) {
    try {
      await api.delete(`problems/${problemId}/cancel-delivery`);
      toast.success('Encomenda cancelada com sucesso!');
    } catch (err) {
      toast.error('A encomenda já foi cancelada');
    }
  }

  return (
    <Container>
      <h1>Problemas na entrega</h1>

      {problems.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>

            {problems.map((problem) => (
              <tr>
                <IdTd>
                  {problem.delivery_id
                    ? `#${problem.delivery_id}`
                    : 'Cancelada'}
                </IdTd>
                <ProblemTd>{problem.description}</ProblemTd>
                <ActionsWrapper>
                  <ActionsIcon
                    size={30}
                    onClick={() => toggleMenu(problem.id)}
                  />

                  <ActionsMenu showActionsMenu={problem.showActionsMenu}>
                    <li
                      onClick={() => {
                        handleModal(problem.id);
                        problem.showActionsMenu = false;
                      }}
                    >
                      <MdRemoveRedEye color="#8E5BE8" />
                      <span>Visualizar</span>
                      {modalOpen && (
                        <Modal toggle={setModalOpen} open={modalOpen}>
                          <ModalTitle>Visualizar Problema</ModalTitle>
                          <ModalDescription>
                            {selectedProblem.description}
                          </ModalDescription>
                        </Modal>
                      )}
                    </li>
                    <li onClick={() => handleCancel(problem.id)}>
                      <MdDeleteForever color="#DE3B3B" />
                      <span>Cancelar encomenda</span>
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
