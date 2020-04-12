import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token } = response.data;

  yield put(signInSuccess(token));

  history.push('/deliveries');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
