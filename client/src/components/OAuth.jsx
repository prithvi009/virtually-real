import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app }  from '../firebase'
import {useDispatch} from 'react-redux'
import {signInSuccess} from "../state/users/userSlice";
import {useNavigate} from "react-router-dom";

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const res = await signInWithPopup(auth, provider)
            const result = await fetch('http://localhost:8080/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: res.user.displayName, email: res.user.email, photo: res.user.photoURL})
            })
            const data = await result.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <button
        className='bg-red-600 text-white px-3 py-2 rounded-lg w-80 mt-3 hover:bg-red-700 uppercase'
        type='button'
        onClick={handleGoogleClick}
    >
        continue with Google

    </button>
  )
}

export default OAuth;