import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import UpdateRow from '~/components/UpdateRow';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  FormContainer,
  FirstLine,
  SecondLine,
  LargeInput,
  SmallInput,
  LastLine,
  MediumInput,
} from '~/pages/Recipients/RecipientsEdit/styles';

export default function RecipientsRegister() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

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
    name,
    street,
    street_number: number,
    complement,
    city,
    state,
    zip_code: zip,
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    state: Yup.string().required(),
    street_number: Yup.string().required(),
    complement: Yup.string().nullable(),
    city: Yup.string().required(),
    zip_code: Yup.string().min(7).max(9).required(),
  });

  async function registerRecipient(data) {
    try {
      const formIsValid = await schema.isValid(data);
      if (formIsValid) {
        await api.post('recipients', {
          name: data.name,
          street: data.street,
          street_number: data.street_number,
          complement: data.complement,
          state: data.state,
          city: data.city,
          zip_code: data.zip_code,
        });

        toast.success('Destinatário cadastrado com sucesso!');
        history.push('/recipients');
      } else {
        toast.error('Preencha os campos corretamente');
      }
    } catch (err) {
      toast.error('Não foi possível cadastrar o destinatário');
    }
  }

  return (
    <Container>
      <UpdateRow
        title="Cadastro de destinatário"
        saveFunction={registerRecipient}
        data={recipientData}
      />
      <FormContainer>
        <FirstLine>
          <span>Nome</span>
          <input type="text" onChange={handleNameChange} />
        </FirstLine>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input type="text" onChange={handleStreetChange} />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input type="text" onChange={handleNumberChange} />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input type="text" onChange={handleComplementChange} />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input type="text" onChange={handleCityChange} />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input type="text" onChange={handleStateChange} />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input type="text" onChange={handleZipChange} />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}
