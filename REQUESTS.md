curl -X GET 'http://localhost:8000/cars?price=desc&manufacturer=Honda&capacity=4&search=civic'

curl -X GET 'http://localhost:8000/cars'

curl -X PATCH -H "Content-Type: application/json" -d '{ "name":"car 2", "price": 900000, "capacity": 5, "type": "Sedan", "manufacturer": "Hundai"}' http://localhost:8000/cars/642c98cdf5ebd79604dcf289
curl -X PATCH -H "Content-Type: application/json" -d '{ "name":"car 4", "price": 8300000, "capacity": 2, "type": "Coupe", "manufacturer": "Jaguar"}' http://localhost:8000/cars/642c98cdf5ebd79604dcf28b
curl -X PATCH -H "Content-Type: application/json" -d '{ "price": 8000000, "capacity": 4}' http://localhost:8000/cars/642c98cdf5ebd79604dcf28b
curl -X PATCH -H "Content-Type: application/json" -d '{ "name":"New car", "price": 9000000, "capacity": 8, "type": "MUV", "manufacturer": "Toyota"}' http://localhost:8000/cars/642c98cdf5ebd79604dcf289

curl -X POST 'http://localhost:8000/cars'

curl -d '{"name":"car 7","price":10200000,"capacity":5,"type":"XUV", "manufacturer":"Audi"}' -H "Content-Type: application/json" -X POST http://localhost:8000/cars

curl -X DELETE http://localhost:8000/cars/642e22a3a417e9397e705338




