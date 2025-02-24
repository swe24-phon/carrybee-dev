import calculatePrice from '../src/js/calculatePrice';

describe('calculatePrice', () => {
  test('calculates the correct total price for a CAR', () => {
    // Given test data
    const vehicleType = 'CAR';
    const distance = 10;
    const weight = 5; 

    // Expected calculation:
    // Base price for CAR: 10.22
    // Distance fee: 10 * 0.8 = 8
    // Weight fee: 5 * 0.3 = 1.5
    // Total: 10.22 + 8 + 1.5 = 19.72
    const expectedPrice = '19.72';

    // When
    const totalPrice = calculatePrice(vehicleType, distance, weight);

    // Then
    expect(totalPrice).toBe(expectedPrice);
  });

  test('throws an error for an invalid vehicle type', () => {
    // Given an invalid vehicle type
    const vehicleType = 'BIKE'; // Assuming BIKE is not a valid type in your mapping
    const distance = 10;
    const weight = 5;

    // Then: Expect the function to throw an error
    expect(() => calculatePrice(vehicleType, distance, weight)).toThrow(
      'Invalid vehicle type or parcel weight'
    );
  });

});
