import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user) | null;
    if(currentUser=== null){
      return(
        <div>loading</div>
      )
    }
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute