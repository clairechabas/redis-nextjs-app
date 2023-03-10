import { useState, useCallback } from 'react'

export default function CarSerchForm() {
  const [hits, setHits] = useState([])

  const search = async (event) => {
    const q = event.target.value

    if (q.length > 2) {
      const params = new URLSearchParams({ q })

      const res = await fetch('/api/search?' + params)
      const result = await res.json()
      console.log(result)

      setHits(result['cars'])
    }
  }

  // We need to debounce the search to avoid
  // calling the API at every key stroke
  function debounce(func, delay) {
    let timeout
    return function (...args) {
      const context = this
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, delay)
    }
  }
  // And we need to apply useCallback to it otherwise
  // our debounce function will be executed again on
  // component re-render providing us with a new function.
  const debounceSearch = useCallback(debounce(search, 200), [])

  return (
    <div>
      <input onChange={debounceSearch} type="text" />

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
