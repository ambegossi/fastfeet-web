import React, { useState } from 'react';
import { MdPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';

import UpdateRow from '~/components/UpdateRow';

import {
  Container,
  FormContainer,
  LineInput,
  AvatarInput,
  EmptyAvatar,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliverymenRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleAvatarChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const newData = {
    avatar_id: file,
    name,
    email,
  };

  async function createDeliveryman(data) {
    try {
      if (data.avatar_id) {
        await api.post('deliverymens', {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });
      } else {
        await api.post('deliverymens', {
          name: data.name,
          email: data.email,
        });
      }

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Não foi possível cadastrar o entregador');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <UpdateRow
        title="Cadastro de entregadores"
        saveFunction={createDeliveryman}
        data={newData}
      />

      <FormContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            {preview ? (
              <img src={preview} alt={name} />
            ) : (
              <EmptyAvatar>
                <MdPhoto size={50} color="#DDD" />
                <span>Adicionar foto</span>
              </EmptyAvatar>
            )}
            <input
              type="file"
              accept="image/*"
              id="avatar"
              onChange={handleAvatarChange}
            />
          </label>
        </AvatarInput>
        <LineInput>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome do entregador aqui"
            onChange={handleNameChange}
          />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email do entregador aqui"
            onChange={handleEmailChange}
          />
        </LineInput>
      </FormContainer>
    </Container>
  );
}
