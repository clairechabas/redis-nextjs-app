import { Client, Entity, Schema } from 'redis-om'

// Connection to Redis
const client = new Client()

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL)
  }
}

// All the Car things: entity, schema and create feature
class Car extends Entity {}

let carSchema = new Schema(
  Car,
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    // Enabling fulltext search on the description
    // with type: 'text' and `textSerch: true`
    description: { type: 'text', textSerch: true },
  },
  {
    dataStructure: 'JSON',
  }
)

export async function createCar(data) {
  // 1. Connect to the db client
  await connect()

  // 2. Create a repository for our Car based on its schema
  const carRepository = client.fetchRepository(carSchema)

  // 3. Create new data
  const car = carRepository.createEntity(data)

  // 4. Commit to db with `carRepository.save()`
  // Redis returns an automatically generated unique ID
  const id = await carRepository.save(car)

  return id
}

// Creating the index needed for our fulltext search
export async function createIndex() {
  await connect()

  const carRepository = client.fetchRepository(carSchema)
  await carRepository.createIndex()
}

export async function searchCars(query) {
  await connect()

  const carRepository = client.fetchRepository(carSchema)

  const cars = await carRepository
    .search()
    .where('make')
    .eq(query)
    .or('model')
    .eq(query)
    .or('description')
    .matches(query)
    .return.all()

  return cars
}
