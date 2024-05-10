// src/mocks/node.js
import { setupServer } from 'msw/node'
import { handlers } from './handelers'
 
export const server = setupServer(...handlers)