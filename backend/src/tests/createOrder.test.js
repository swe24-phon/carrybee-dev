const { createOrder } = require('../src/models/order'); // Adjust the path accordingly
const axios = require('axios');  // We need to mock axios

// Mocking axios
jest.mock('axios');

describe('createOrder function', () => {
  it('should create an order successfully with valid coordinates', async () => {
    // Mock axios to simulate successful geocoding
    axios.get.mockResolvedValue({
      data: {
        status: 'OK',
        results: [{ geometry: { location: { lat: 40.712776, lng: -74.005974 } } }],
      },
    });

    const orderData = {
      user_id: 1,
      receiver_name: 'John Doe',
      pickup_address: 'valid address',
      dropoff_address: 'valid address',
      pickup_date: '2025-02-20',
      vehicleType: 'van',
      parcelData: { weight: 5, category: 'electronics' },
    };

    const response = await createOrder(orderData);

    // Assertions (replace with actual expected values)
    expect(response.message).toBe('Order created successfully');
    expect(response.order).toHaveProperty('pickup_lat');
    expect(response.order).toHaveProperty('pickup_lon');
    expect(response.order).toHaveProperty('dropoff_lat');
    expect(response.order).toHaveProperty('dropoff_lon');
  });

  it('should throw an error if geocoding fails (invalid address)', async () => {
    // Mock axios to simulate geocoding failure
    axios.get.mockResolvedValue({
      data: {
        status: 'ZERO_RESULTS', // Geocoding failure scenario
      },
    });

    const orderData = {
      user_id: 1,
      receiver_name: 'Jane Doe',
      pickup_address: 'invalid address',
      dropoff_address: 'valid address',
      pickup_date: '2025-02-20',
      vehicleType: 'bike',
      parcelData: { weight: 2, category: 'clothing' },
    };

    try {
      await createOrder(orderData);
    } catch (error) {
      expect(error.message).toBe('Geocoding failed. Invalid address.');
    }
  });

  it('should throw an error if there is a network issue (axios error)', async () => {
    // Mock axios to simulate a network error
    axios.get.mockRejectedValue(new Error('Network Error'));

    const orderData = {
      user_id: 1,
      receiver_name: 'Tom Doe',
      pickup_address: 'valid address',
      dropoff_address: 'valid address',
      pickup_date: '2025-02-20',
      vehicleType: 'truck',
      parcelData: { weight: 10, category: 'furniture' },
    };

    try {
      await createOrder(orderData);
    } catch (error) {
      expect(error.message).toBe('Error fetching geolocation: Network Error');
    }
  });
});
