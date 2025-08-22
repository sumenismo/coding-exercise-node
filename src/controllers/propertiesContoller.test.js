import httpMocks from 'node-mocks-http';
import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { db } from '../db.js';
import { addProperty, getProperties } from './propertiesController.js';

describe('Properties Controller', () => {
  const existingProperty = {
    address: {
      street: '111 Existing St',
      suburb: 'Brighton',
      state: 'TAS',
      zip: '7030',
    },
    salePrice: 500000,
    description: 'A nice house',
    id: 'existing-property-id',
  };

  const anotherProperty = {
    ...existingProperty,
    address: { ...existingProperty.address, street: '222 Another St' },
    salePrice: 100000,
    id: 'another-property-id',
  };

  beforeEach(() => {
    db.properties = [];
  });

  describe('addProperty', () => {
    let mockReq = httpMocks.createRequest();
    let mockRes;

    beforeEach(() => {
      mockRes = httpMocks.createResponse();
      db.properties = [existingProperty];
    });

    it('should add a new property successfully', () => {
      const mockNewProperty = {
        address: {
          street: '555 Random St',
          suburb: 'Brighton',
          state: 'TAS',
          zip: '7030',
        },
        salePrice: 500000,
        description: 'A nice house',
      };

      mockReq = httpMocks.createRequest({
        body: mockNewProperty,
      });

      addProperty(mockReq, mockRes);

      assert.strictEqual(mockRes.statusCode, 201);
      assert.deepEqual(mockRes._getJSONData(), {
        message: 'Property added successfully',
        newProperty: mockNewProperty,
      });
    });

    it('should return 400 if property already exists', () => {
      mockReq = httpMocks.createRequest({
        body: existingProperty,
      });

      addProperty(mockReq, mockRes);

      assert.strictEqual(mockRes.statusCode, 400);
      assert.deepEqual(mockRes._getJSONData(), {
        message: 'Property already exists',
      });
    });
  });

  describe('getProperties', () => {
    let mockReq = httpMocks.createRequest();
    let mockRes;

    beforeEach(() => {
      mockRes = httpMocks.createResponse();
      db.properties = [existingProperty, anotherProperty];
    });

    it('should return all properties when no filters are applied', () => {
      getProperties(mockReq, mockRes);

      assert.strictEqual(mockRes.statusCode, 200);
      assert.deepEqual(mockRes._getJSONData(), db.properties);
    });

    it('should filter properties by suburb and state and add comparison to average attribute', () => {
      mockReq = httpMocks.createRequest({
        query: { suburb: 'brighton', state: 'tas' },
      });

      getProperties(mockReq, mockRes);

      assert.strictEqual(mockRes.statusCode, 200);
      assert.deepEqual(mockRes._getJSONData(), [
        { ...existingProperty, averagePriceComparison: 'above' },
        {
          ...anotherProperty,
          averagePriceComparison: 'below',
        },
      ]);
    });
  });
});
