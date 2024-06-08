function knn(drivers, passengers) {
  // Function to calculate Euclidean distance in kilometers
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return parseFloat(distance.toFixed(2)); // Distance in kilometers, rounded to 2 decimal places
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Find the nearest drivers for a given passenger
  function findNearestDrivers(passenger, drivers, k = 3) {
    const { lat: pLat, lng: pLng } = passenger.location;

    // User preference
    // Filter drivers based on user preference e.g pickup time and gender. But this will be implemented later
    // const eligibleDrivers = drivers.filter(
    //   (driver) => driver.pickUpTime === pickUpTime && driver.gender === gender
    // );

    const matchedDrivers = drivers.map((driver) => {
      const { lat: dLat, lng: dLng } = driver.location;
      const distance = calculateDistance(pLat, pLng, dLat, dLng);
      return { driver, distance };
    });

    // Sort drivers by distance and return the top k drivers
    return matchedDrivers
      .sort((a, b) => a.distance - b.distance)
      .slice(0, k)
      .map((match) => match.driver);
  }

  // Match passengers to drivers and return formatted results
  function matchPassengers(passenger, drivers) {
    const nearestDrivers = findNearestDrivers(passenger, drivers);
    return nearestDrivers.map(
      (driver, idx) =>
        `Matched Driver ${idx + 1}: ${
          driver.email
        }, Distance: ${calculateDistance(
          passenger.location.lat,
          passenger.location.lng,
          driver.location.lat,
          driver.location.lng
        )} km`
    );
  }

  // Example usage: match the first passenger
  const numberOfPassengersToMatch = 1; // You can change this value if needed
  return passengers
    .slice(0, numberOfPassengersToMatch)
    .map((passenger) => matchPassengers(passenger, drivers));
}

module.exports = knn;
