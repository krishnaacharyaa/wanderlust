//after each test, the function cleanup is executed to reset jsdom, which is simulating the browser.
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './src/__tests__/mocks/node-mock';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  cleanup();
});
