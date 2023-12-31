import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      setLoading(false)
      if(data.success === false){
        setError(data.message)
        return
      }
      navigate('/sign-in')
      console.log(data)
    }
    catch(err){
      setLoading(false)
      console.log(err)
    }
    

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <input type="text" 
          placeholder='Username' 
          className='border border-gray-300 p-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent' id='username'
          onChange={handlechange}
        />
        <input type="email" 
          placeholder='Email' 
          className='border border-gray-300 p-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent my-3' id='email'
          onChange={handlechange}
        />
        <input type="password" 
          placeholder='Password' 
          className='border border-gray-300 p-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent' id='password'
          onChange={handlechange}
        />
        <button 
          className='bg-slate-600 text-white px-3 py-2 rounded-lg w-80 mt-3 hover:bg-slate-700 uppercase'
          disabled={loading}
        >{loading ? 'Loading...' : 'Sign up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p >Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
}

export default SignUp