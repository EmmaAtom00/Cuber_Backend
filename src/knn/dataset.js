// The training dataset generator to test the reliability of the ML algorithm
// This code generates both the driver json file and the passenger json file

const fs = require("fs");

function generateLatLong() {
  const baseLat = 7.1606;
  const baseLong = 3.3481;
  return {
    latitude: parseFloat((baseLat + (Math.random() - 0.5) * 0.1).toFixed(4)),
    longitude: parseFloat((baseLong + (Math.random() - 0.5) * 0.1).toFixed(4)),
  };
}

function generateTime() {
  const start = new Date(2024, 5, 21, 0, 0);
  const end = new Date(2024, 5, 21, 23, 59);
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime.toTimeString().slice(0, 5);
}

function generateGender() {
  return Math.random() > 0.5 ? "male" : "female";
}

function generateDrivers(n) {
  const drivers = [];
  for (let i = 0; i < n; i++) {
    const location = generateLatLong();
    drivers.push({
      name: "",
      latitude: location.latitude,
      longitude: location.longitude,
      pickUpTime: generateTime(),
      gender: generateGender(),
    });
  }
  return drivers;
}

function generatePassengers(n) {
  const passengers = [];
  for (let i = 0; i < n; i++) {
    const location = generateLatLong();
    passengers.push({
      name: "",
      latitude: location.latitude,
      longitude: location.longitude,
      pickUpTime: generateTime(),
      gender: generateGender(),
    });
  }
  return passengers;
}

// The number of data generated can be influenced through the parameter passed to the generateDriver and generatePassenger function
const drivers = generateDrivers(300);
const passengers = generatePassengers(300);

fs.writeFileSync("drivers.json", JSON.stringify(drivers, null, 2));
fs.writeFileSync("passengers.json", JSON.stringify(passengers, null, 2));

console.log("Datasets generated and saved to drivers.json and passengers.json");
