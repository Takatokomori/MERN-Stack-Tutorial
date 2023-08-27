import {useState} from "react"

const RestaurantForm = () =>{
  const [title, setTitle] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const restaurant = {title, cuisine}
    const res = await fetch("/restaurants", {
      method: "POST",
      body: JSON.stringify(restaurant),
      headers:{
        "Content-Type": "application/json"
      }
    })
    const json = await res.json()

    // set the same value in server
    if(!res.ok){
      setError(json.msg)
    }
    if(res.ok){
      setTitle('')
      setCuisine('')
      setError(null)
      console.log("new restaurant added", json.msg)
    }
  }
  return (
    <form
     className="create"
     onSubmit={handleSubmit}
    >
     <h3>Add a New Restaurant</h3>
     <label>Restaurant Title</label>
     <input type="text"
     onChange = {(e) => setTitle(e.target.value) }
     value={title}
     />
     <label>Restaurant Cuisine</label>
     <input type="text"
     onChange = {(e) => setCuisine(e.target.value) }
     value={cuisine}
     />
     <button>Submit Restaurant</button>
    {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RestaurantForm
