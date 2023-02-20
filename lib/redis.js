import { Client, Entity, Schema, Repository } from 'redis-om'

const client = new Client()

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL)
  }
}

class Car extends Entity {}

let carSchema = new Schema(
  Car,
  {
    make: { type: 'string' },
    model: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
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
