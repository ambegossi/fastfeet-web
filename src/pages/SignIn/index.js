import React from 'react';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />

      <form>
        <strong>SEU E-MAIL</strong>
        <input type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <input type="password" placeholder="******" />

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}
