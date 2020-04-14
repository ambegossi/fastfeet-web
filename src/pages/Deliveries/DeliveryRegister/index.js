import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

import UpdateRow from '~/components/UpdateRow';
import { selectorStyles } from '~/components/AsyncSelector/styles';

import {
  Container,
  FormContainer,
  FirstLine,
  FirstLineInput,
  SecondLine,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliveryRegister() {
  const [productInput, setProductInput] = useState('');
  const [recipientInput, setRecipientInput] = useState('');
  const [deliverymanInput, setDeliverymanInput] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadData() {
      const responseDeliverymen = await api.get('deliverymens');
      const deliverymenFound = responseDeliverymen.data;
      setDeliverymen(
        deliverymenFound.map((d) => ({
          id: d.id,
          label: d.name,
          value: d.name.toLowerCase(),
        }))
      );

      const responseRecipients = await api.get('recipients');
      const recipientsFound = responseRecipients.data;

      setRecipients(
        recipientsFound.map((r) => ({
          id: r.id,
          label: r.name,
          value: r.name.toLowerCase(),
        }))
      );
    }

    loadData();
  }, []);

  function handleRecipientInput(selectedOption) {
    setRecipientInput(selectedOption.id);
  }

  function handleDeliverymanInput(selectedOption) {
    setDeliverymanInput(selectedOption.id);
  }

  function handleProductInput(e) {
    setProductInput(e.target.value);
  }

  function filterRecipients(inputValue) {
    return recipients.filter((r) =>
      r.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function filterDeliverymen(inputValue) {
    return deliverymen.filter((d) =>
      d.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function promiseRcpOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterRecipients(inputValue));
    }, 100);
  }

  function promiseDmnOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterDeliverymen(inputValue));
    }, 100);
  }

  async function registerDelivery(data) {
    try {
      await api.post('deliveries', {
        recipient_id: data.recipient_id,
        deliveryman_id: data.deliveryman_id,
        product: data.product,
      });
      toast.success('Encomenda cadastrada com sucesso!');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Não foi possível cadastrar a encomenda');
      console.tron.log(err);
    }
  }

  const uploadData = {
    recipient_id: recipientInput,
    deliveryman_id: deliverymanInput,
    product: productInput,
  };

  return (
    <Container>
      <UpdateRow
        title="Cadastro de encomendas"
        saveFunction={registerDelivery}
        data={uploadData}
      />
      <FormContainer>
        <FirstLine>
          <FirstLineInput>
            <span>Destinatário</span>
            <div>
              <AsyncSelect
                styles={selectorStyles}
                onChange={handleRecipientInput}
                defaultOptions={recipients}
                loadOptions={promiseRcpOptions}
                placeholder="Selecionar"
                loadingMessage={() => 'Carregando...'}
                noOptionsMessage={() => 'Nenhuma opção encontrada'}
              />
            </div>
          </FirstLineInput>
          <FirstLineInput>
            <span>Entregador</span>
            <div>
              <AsyncSelect
                styles={selectorStyles}
                onChange={handleDeliverymanInput}
                defaultOptions={deliverymen}
                loadOptions={promiseDmnOptions}
                placeholder="Selecionar"
                loadingMessage={() => 'Carregando...'}
                noOptionsMessage={() => 'Nenhuma opção encontrada'}
              />
            </div>
          </FirstLineInput>
        </FirstLine>
        <SecondLine>
          <span>Nome do Produto</span>
          <input
            type="text"
            value={productInput}
            onChange={handleProductInput}
          />
        </SecondLine>
      </FormContainer>
    </Container>
  );
}
