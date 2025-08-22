import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import httpMocks from 'node-mocks-http';
import * as z from 'zod';
import { validate } from './validate.js';

const testSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be a positive number'),
});

describe('Validate', () => {
  let mockres = httpMocks.createResponse();
  const middleware = validate(testSchema);

  it('should throw error 400 for invalid data', () => {
    const mockReq = httpMocks.createRequest({
      body: {
        name: '',
        age: '10',
      },
    });

    middleware(mockReq, mockres, () => {});
    assert.strictEqual(mockres.statusCode, 400);
  });

  it('should call next() for valid data', () => {
    const mockReq = httpMocks.createRequest({
      body: {
        name: 'John Doe',
        age: 30,
      },
    });

    const nextSpy = mock.fn();

    middleware(mockReq, mockres, nextSpy);
    assert.equal(nextSpy.mock.callCount(), 1);
  });
});
