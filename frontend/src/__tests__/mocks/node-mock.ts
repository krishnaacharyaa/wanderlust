// src/mocks/node.js
import { setupServer } from 'msw/node';
import { handlers } from './handeler-mock';

export const server = setupServer(...handlers);
