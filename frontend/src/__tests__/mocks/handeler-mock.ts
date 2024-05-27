// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://localhost:5000/api/auth/email-password/signup', () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
