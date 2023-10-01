import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../state/users/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        dispatch(signInStart())
      const res = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(res.status)
      if(res.status !== 200){
        dispatch(signInFailure(data.message))
        return
      }
        dispatch(signInSuccess(data))
      navigate('/')
    }
    catch(err){
      dispatch(signInFailure(err.message))
    }
    

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        
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
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>

      </form>
      <div className='flex gap-2 mt-5'>
        <p >Don't have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
}

export default SignIn