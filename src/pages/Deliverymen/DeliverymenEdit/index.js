import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import UpdateRow from '~/components/UpdateRow';

import { Container, FormContainer, LineInput, AvatarInput } from './styles';

import api from '~/services/api';

export default function DeliverymenEdit({ location }) {
  const { deliveryman } = location.state;
  const defaultAvatar = deliveryman.avatar
    ? deliveryman.avatar.url
    : `https://ui-avatars.com/api/?name=${deliveryman.name.replace(
        /\s/g,
        '+'
      )}`;
  const [name, setName] = useState(deliveryman.name);
  const [email, setEmail] = useState(deliveryman.email);
  const [file, setFile] = useState(deliveryman.avatar_id);
  const [preview, setPreview] = useState(defaultAvatar);

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
    id: deliveryman.id,
    avatar_id: file,
    name,
    email,
  };

  async function uploadDeliveryman(data) {
    try {
      if (data.avatar_id) {
        await api.put(`/deliverymens/${data.id}`, {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        });
      } else {
        await api.put(`/deliverymens/${data.id}`, {
          name: data.name,
          email: data.email,
        });
      }

      toast.success('Entregador atualizado com sucesso!');
    } catch (err) {
      toast.error('Não foi possível atualizar o entregador');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <UpdateRow
        title="Edição de entregadores"
        saveFunction={uploadDeliveryman}
        data={newData}
      />
      <FormContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            <img
              src={
                preview ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={name}
            />
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
          <input type="text" defaultValue={name} onChange={handleNameChange} />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input
            type="email"
            defaultValue={email}
            onChange={handleEmailChange}
          />
        </LineInput>
      </FormContainer>
    </Container>
  );
}

DeliverymenEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
