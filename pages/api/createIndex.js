import { createIndex } from '@/lib/redis'

// To create this index, just open a browser window
// and navigate to http://localhost:3000/api/createIndex.
// You only need to do this once.
export default async function handler(req, res) {
  await createIndex()

  res.status(200).send('Ok 👌')
}
