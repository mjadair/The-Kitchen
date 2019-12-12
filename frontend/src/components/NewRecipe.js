import React, { useState } from 'react'
import axios from 'axios'
import useForm from "react-hook-form"
import Auth from '../lib/auth'


function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, k) => k)
}


const Register = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const { register } = useForm()
  const [ingredientSize, setIngredientSize] = useState(1)
  const [methodSize, setMethodSize] = useState(1)
  const [categorySize, setCategorySize] = useState(1)
  const onSubmit = data => console.log(data)



 


  const postIt = () => {
    axios.post('/api/recipes', data,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => props.history.push('/login'))
      .catch(err => {
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors)
      })
  }


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log([e.target.name])
    setErrors({})
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    postIt()
  }

  return (
    <section className='section'>
      <div className="title">Add a new Recipe</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className='field'>
          <div className='control'>
            <label htmlFor=''>
              What&apos;s it called?
              <input onChange={handleChange} className='input is-info' type='text' name='name' />
            </label>
          </div>
          {errors.name && <small className="help is-danger">
            {errors.name}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor=''>
              Who created it?
              <input onChange={handleChange} className='input is-info' type='text' name='author' />
            </label>
          </div>
          {errors.author && <small className="help is-danger">
            {errors.author}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor=''>
              What&apos;s the story behind this dish?
              <input onChange={handleChange} className='input is-info' type='text' name='method' />
            </label>
          </div>
          {errors.method && <small className="help is-danger">
            {errors.method}
          </small>}
        </div>

        {createArrayWithNumbers(ingredientSize).map((index, i) => {
          return (
            <div key={i} className='field'>
              <div className='control'>
                <label htmlFor=''>
                  Add ingredient {index + 1}
                  <input onChange={handleChange} className='input is-info' type='text' name={`ingredients[${index}]`} />
                </label>
              </div>
              {errors.ingredients && <small className="help is-danger">
                {errors.ingredients}
              </small>}
            </div>
          )
        })}
        <button type="button" onClick={() => setIngredientSize(ingredientSize + 1)} >
          Add another ingredient
        </button>
        {
          createArrayWithNumbers(methodSize).map((index, i) => {
            return (
              <div key={i} className='field'>
                <div className='control'>
                  <label htmlFor=''>
                    Add step {index + 1}
                    <input onChange={handleChange} className='input is-info' type='text' name={`method[${index}]`} />
                  </label>
                </div>
                {errors.method && <small className="help is-danger">
                  {errors.method}
                </small>}
              </div>
            )
          })}
        <button type="button" onClick={() => setMethodSize(methodSize + 1)} >
          Add another step
        </button>

        {
          createArrayWithNumbers(categorySize).map((index, i) => {
            return (
              <div key={i} className='field'>
                <div className='control'>
                  <label htmlFor=''>
                    Add a category (e.g &lsquo;Vegetarian&rsquo;, &lsquo;Comfort-food&rsquo;)
                    <input onChange={handleChange} className='input is-info' type='text' name={`category[${index}]`} />
                  </label>
                </div>
                {errors.category && <small className="help is-danger">
                  {errors.category}
                </small>}
              </div>
            )
          })}
        <button type="button" onClick={() => setCategorySize(categorySize + 1)} >
          Add another category
        </button>
        <div className='field'>
          <div className='control'>
            <label htmlFor=''>
              Add a link to a picture of it
              <input onChange={handleChange} className='input is-info' type='text' name='image' value={data.image ? data.image : ''} />
            </label>
          </div>
          {errors.image && <small className="help is-danger">
            {errors.image}
          </small>}
        </div>
        <button className="button is-info">
          Submit Recipe!
        </button>
      </form>
    </section >
  )
}

export default Register