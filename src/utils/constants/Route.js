import { SUBJECT } from './Subject';

export const ROUTE = Object.freeze({
  INDEX: '/',
  DEMO: '/demo',
  LOGIN: '/login',
  PROFILE: '/profile',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password',

  ARITHMETICS: `/${SUBJECT.ARITHMETICS}`,
  MATH: `/${SUBJECT.MATH}`,
  READING: `/${SUBJECT.READING}`,

  PROMPT_TEST: `/prompt-test`,
  DEV_TEST_PAGE: `/dev-test-page`,
});
