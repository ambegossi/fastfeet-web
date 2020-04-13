import React from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.svg';

import {
  Container,
  Wrapper,
  LeftContent,
  NavigationOptions,
  RightContent,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Wrapper>
        <LeftContent>
          <NavLink to="/deliveries">
            <img src={logo} alt="FastFeet" />
          </NavLink>
          <NavigationOptions>
            <NavLink to="/deliveries" activeStyle={{ color: '#444' }}>
              Encomendas
            </NavLink>
            <NavLink to="/deliverymen" activeStyle={{ color: '#444' }}>
              Entregadores
            </NavLink>
            <NavLink to="/recipients" activeStyle={{ color: '#444' }}>
              Destinatários
            </NavLink>
            <NavLink to="/problems" activeStyle={{ color: '#444' }}>
              Problemas
            </NavLink>
          </NavigationOptions>
        </LeftContent>
        <RightContent>
          <span>{profile.name}</span>
          <button type="button" onClick={handleLogout}>
            sair do sistema
          </button>
        </RightContent>
      </Wrapper>
    </Container>
  );
}
