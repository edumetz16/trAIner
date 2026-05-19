import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { createNestServer } from './main';

initializeApp();

const bootstrap = createNestServer();

export const api = onRequest(async (req, res) => {
  const server = await bootstrap;
  return server(req, res);
});
