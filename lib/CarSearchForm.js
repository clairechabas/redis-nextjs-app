import { useState, useCallback } from 'react'

export default function CarSerchForm() {
  const [hits, setHits] = useState([])

  const search = async (event) => {
    const q = event.target.value

    if (q.length > 2) {
      const params = new URLSearchParams({ q })

      // This call should be debounced to avoid
      // calling the API at every key stroke
      const res = await fetch('/api/search?' + params)
      const result = await res.json()
      console.log(result)

      setHits(result['cars'])
    }
  }

  // Debouncing attempts
  // let timeout
  // const debounce = function (func, delay) {
  //   clearTimeout(timeout)
  //   console.log('debouncing baby')

  //   timeout = setTimeout(func, delay)
  // }

  // const optimizedSearch = useCallback(debounce(search), [])

  return (
    <div>
      <input onChange={search} type="text" />

      <ul>
        {hits.map((hit) => (
          <li key={hit.entityId}>
            {hit.make} {hit.model}
          </li>
        ))}
      </ul>
    </div>
  )
}
