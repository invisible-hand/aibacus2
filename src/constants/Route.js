import { SUBJECT } from './Subject';

export const ROUTE = Object.freeze({
  INDEX: '/',
  DEMO: '/demo',
  LOGIN: '/login',
  PROFILE: '/profile',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password',

  MATH: `/${SUBJECT.MATH}`,
  READING: `/${SUBJECT.READING}`,
});
