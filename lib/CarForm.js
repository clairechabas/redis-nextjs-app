export default function CarForm() {
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Convert the event.target (= the html form) to a FormData
    // instance to organizes the form fields into key/value pairs,
    const form = new FormData(event.target)
    // which we can then turn into a plain JS object:
    const formData = Object.fromEntries(form.entries())

    const res = await fetch('/api/cars', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await res.json()

    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Make sure that your `name`s match your schema 
      properties since it will be used as keys when turned
      in a FormData object. */}
      <label htmlFor="make">Make</label>
      <input name="make" type="text" />

      <label htmlFor="model">Model</label>
      <input name="model" type="text" />

      <label htmlFor="image">Image</label>
      <input name="image" type="text" />

      <label htmlFor="description">Description</label>
      <textarea name="description" type="text"></textarea>

      <button type="submit">Create Car</button>
    </form>
  )
}
