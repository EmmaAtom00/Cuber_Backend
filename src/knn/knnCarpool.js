function knn(drivers, passengers, preferences = { available: true }) {
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

    // Filter drivers based on user preferences
    let eligibleDrivers = drivers;
    if (preferences.pickUpTime) {
      eligibleDrivers = eligibleDrivers.filter(
        (driver) => driver.pickUpTime === preferences.pickUpTime
      );
    }
    if (preferences.gender) {
      eligibleDrivers = eligibleDrivers.filter(
        (driver) => driver.gender === preferences.gender
      );
    }
    if (preferences.available) {
      eligibleDrivers = eligibleDrivers.filter(
        (driver) => driver.available === preferences.available
      );
    }

    const matchedDrivers = eligibleDrivers.map((driver) => {
      const { lat: dLat, lng: dLng } = driver.location;
      const distance = calculateDistance(pLat, pLng, dLat, dLng);
      let Driver = { ...driver, distance };
      return { driver, distance };
    });

    // Sort drivers by distance and return the top k drivers
    return matchedDrivers.sort((a, b) => a.distance - b.distance).slice(0, k);
    // .map((match) => {
    //   return match.driver;
    // });
  }

  // Match passengers to drivers and return formatted results
  function matchPassengers(passenger, drivers) {
    return findNearestDrivers(passenger, drivers);
  }

  // Example usage: match all passengers
  return passengers.map((passenger) => matchPassengers(passenger, drivers));
}

module.exports = knn;
