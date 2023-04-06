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
      res.status(201).send({message:'Added a new car successfully'});
    })
    .catch(err => {
      res.status(400).send({message:'Server error', err});
    });
});

carsRouter.get('/cars', async (req, res, next) => {
  const { price, manufacturer, capacity, search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } },
      ],
    };
  }

  if (capacity) {
    query.capacity = capacity;
  }

  if (manufacturer) {
    query.manufacturer = manufacturer;
  }

  try {
    let cars;
    if (price === 'asc') {
      cars = await Car.find(query).sort({ price: 1 });
    } else if (price === 'desc') {
      cars = await Car.find(query).sort({ price: -1 });
    } else {
      cars = await Car.find(query);
    }
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).send({message:'Error fetching cars', err});
  }
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
    res.status(200).send({message:"Updated successfully"});
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
    res.status(200).send({ message: 'Deleted successfully' });
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