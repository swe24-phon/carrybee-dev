const axios = require('axios');
const { geocodeAddress } = require('../services/geocodeService');

jest.mock('axios');

describe('geocodeAddress', () => {
    it('should return latitude and longitude for a valid address', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              geometry: {
                location: { lat: 40.7128, lng: -74.0060 },
              },
            },
          ],
        },
      };
  
      axios.get.mockResolvedValue(mockResponse);
  
      const result = await geocodeAddress('New York, NY');
      expect(result).toEqual({ lat: 40.7128, lng: -74.0060 });
    });
    it('should throw an error if no results are found', async () => {
        const mockResponse = { data: { results: [] } };
        axios.get.mockResolvedValue(mockResponse);
    
        await expect(geocodeAddress('Invalid Address')).rejects.toThrow('Geocoding failed');
      });
    });
    
// orderService.test.js
const { PrismaClient } = require('@prisma/client');
const { createOrder } = require('../services/orderService'); // Adjust the import path as needed

jest.mock('@prisma/client');

describe('createOrder', () => {
  it('should create a new order successfully', async () => {
    const mockOrder = { id: 1, address: '123 Main St' };
    PrismaClient.prototype.order.create.mockResolvedValue(mockOrder);

    const result = await createOrder('123 Main St');
    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order creation fails', async () => {
    PrismaClient.prototype.order.create.mockRejectedValue(new Error('Database error'));

    await expect(createOrder('123 Main St')).rejects.toThrow('Database error');
  });
});