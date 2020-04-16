import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import UpdateRow from '~/components/UpdateRow';

import api from '~/services/api';

import {
  Container,
  FormContainer,
  FirstLine,
  SecondLine,
  LastLine,
  LargeInput,
  SmallInput,
  MediumInput,
} from './styles';

export default function RecipientsEdit({ location }) {
  const { recipient } = location.state;

  const { id } = recipient;
  const [name, setName] = useState(recipient.name);
  const [street, setStreet] = useState(recipient.street);
  const [number, setNumber] = useState(recipient.street_number);
  const [complement, setComplement] = useState(recipient.complement);
  const [city, setCity] = useState(recipient.city);
  const [state, setState] = useState(recipient.state);
  const [zip, setZip] = useState(recipient.zip_code);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleStreetChange(e) {
    setStreet(e.target.value);
  }
  function handleNumberChange(e) {
    setNumber(e.target.value);
  }
  function handleComplementChange(e) {
    setComplement(e.target.value);
  }
  function handleCityChange(e) {
    setCity(e.target.value);
  }
  function handleStateChange(e) {
    setState(e.target.value);
  }
  function handleZipChange(e) {
    setZip(e.target.value);
  }

  const recipientData = {
    id,
    name,
    street,
    street_number: number,
    complement,
    city,
    state,
    zip_code: zip,
  };

  const schema = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string().required(),
    street: Yup.string().required(),
    state: Yup.string().required(),
    street_number: Yup.string().required(),
    complement: Yup.string().nullable(),
    city: Yup.string().required(),
    zip_code: Yup.string().min(7).max(9).required(),
  });

  async function updateRecipient(data) {
    try {
      const formIsValid = await schema.isValid(data);

      if (formIsValid) {
        await api.put(`/recipients/${data.id}`, {
          name: data.name,
          street: data.street,
          street_number: data.street_number,
          complement: data.complement,
          state: data.state,
          city: data.city,
          zip_code: data.zip_code,
        });

        toast.success('Destinatário atualizado com sucesso!');
      } else {
        toast.error('Dados inseridos inválidos');
      }
    } catch (err) {
      console.tron.log(err);
      toast.error('Não foi possível atualizar o destinatário');
    }
  }

  return (
    <Container>
      <UpdateRow
        title="Edição de destinatário"
        saveFunction={updateRecipient}
        data={recipientData}
      />
      <FormContainer>
        <FirstLine>
          <span>Nome</span>
          <input type="text" defaultValue={name} onChange={handleNameChange} />
        </FirstLine>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input
              type="text"
              defaultValue={street}
              onChange={handleStreetChange}
            />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input
              type="text"
              defaultValue={number}
              onChange={handleNumberChange}
            />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input
              type="text"
              defaultValue={complement}
              onChange={handleComplementChange}
            />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input
              type="text"
              defaultValue={city}
              onChange={handleCityChange}
            />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input
              type="text"
              defaultValue={state}
              onChange={handleStateChange}
            />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input type="text" defaultValue={zip} onChange={handleZipChange} />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}

RecipientsEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
