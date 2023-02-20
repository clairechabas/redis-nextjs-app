import CarForm from '../lib/CarCreateForm'
import SearchForm from '../lib/CarSearchForm'

export default function Home() {
  return (
    <div className="app">
      <h1>Find a Car</h1>
      <SearchForm />

      <hr />

      <h1>Create a Car</h1>
      <CarForm />
    </div>
  )
}
