const express = require("express");

//setting up the cars router
const carsRouter = express.Router();
var Car = require('../mongoose/models/cars');

//write your code for the endpoints here

carsRouter.post('/cars', (req, res) => {
  console.log('the request:', req.body);
  const newCar = new Car({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    capacity: req.body.capacity,
    manufacturer: req.body.manufacturer,
  });

  newCar.save()
    .then(car => {
      res.status(201).send('Added a new car successfully');
    })
    .catch(err => {
      res.status(400).send('Server error', err);
    });
});

carsRouter.get('/cars', (req, res, next) => {
  const { price, manufacturer, capacity, search } = req.query;

  // construct Mongoose query object based on query params
  const query = {};
  if (manufacturer) {
    query.manufacturer = manufacturer;
  }
  if (capacity) {
    query.capacity = capacity;
  }
  if (search) {
    query.$or = [{ name: { $regex: search, $options: 'i' } }, { manufacturer: { $regex: search, $options: 'i' } }];
  }

  // construct Mongoose sort object based on price query param
  let sort = {};
  if (price) {
    sort.price = price === 'asc' ? 1 : -1;
  }

  // query the cars collection using Mongoose and return the filtered data
  Car.find(query).sort(sort).exec((err, cars) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Server error' });
    }
    res.status(200).json(cars);
  });
});

carsRouter.patch('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!car) {
      return res.status(400).send({ message: 'Car not found' });
    }
    res.status(200).send(car);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Server error' });
  }
});

carsRouter.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.status(200).send({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Server error' });
  }
});

// carsRouter.get('/cars/:id', () => {
//   const id = req.query.id;
// });

//exporting the router
module.exports = carsRouter;