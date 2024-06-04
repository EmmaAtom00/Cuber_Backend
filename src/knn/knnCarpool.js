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
    return distance.toFixed(2); // Distance in kilometers, rounded to 2 decimal places
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // k-NN Algorithm
  function findNearestDrivers(passenger, drivers) {
    const { lat: pLat, lng: pLong } = passenger.location; //, pickUpTime, gender (extra preferences that can be added in the future)
    let matchedDrivers = [];

    // Filter drivers based on user preference e.g pickup time and gender. But this will be implemented later
    // const eligibleDrivers = drivers.filter(
    //   (driver) => driver.pickUpTime === pickUpTime && driver.gender === gender
    // );

    // Calculate distance for each eligible driver using Euclidean distance
    drivers.forEach((driver) => {
      const { lat: dLat, lng: dLong } = driver.location;
      const distance = calculateDistance(pLat, pLong, dLat, dLong);
      matchedDrivers.push({ driver, distance });
    });

    // Sort drivers by distance
    matchedDrivers.sort((a, b) => a.distance - b.distance);

    // Select the top 3 drivers(the numbers of K)
    return matchedDrivers.slice(0, 3).map((match) => match.driver);
  }

  // Function to match a specified number of passengers
  function matchPassengers(passenger, drivers) {
    const nearestDrivers = findNearestDrivers(passenger, drivers);
    let matchedDrivers = [];
    nearestDrivers.forEach((driver, idx) => {
      matchedDrivers.push(
        `Matched Driver ${idx + 1}: ${
          driver.email
        },Distance: ${calculateDistance(
          passenger.location.lat,
          passenger.location.lng,
          driver.location.lat,
          driver.location.lng
        )} km `
      );

      // console.log(matchedDrivers);
    });
    return matchedDrivers;
  }

  // Example usage: match first 5 passengers
  const numberOfPassengersToMatch = 1; // You can change this value
  return matchPassengers(passengers, drivers);
}

module.exports = knn;
