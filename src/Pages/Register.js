import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { createUserWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import { auth,provider,db } from '../config/firebase';
import {setDoc,doc} from "firebase/firestore";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const [data,setdata] = useState({
    email:"",
    password:""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setdata(prev => ({
      ...prev,
      [name]: value
    }));
  }
  

    const onSubmit = async (e) => {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth,data.email, data.password)
      .then(userCredentials =>{
        const user = userCredentials.user;
        if(user){
          setDoc(doc(db,"Users",user.uid),{
            email:user.email
          })
        }
        console.log(user);
        navigate('/');
      })
      .catch((err)=>{
        const errorMessage = err.message;
        alert(errorMessage);
      })
    }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth,provider)
    .then(userCredentials =>{
      const user = userCredentials.user;
      if(user){
        setDoc(doc(db,"Users",user.uid),{
          email:user.email
        })
      }
      console.log(user);
      navigate('/');
    } )
    .catch((error) => alert(error.message))
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Register here</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange = {handleChange}
                  autoComplete="email"
                  value = {data.email}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value = {data.password}
                  onChange = {handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick = {onSubmit}
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring-blue-500"
            >
              <span className="sr-only">Sign up with Google</span>
              <FaGoogle className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
            Already have an account? <a href="/" className="text-blue-500 hover:text-blue-700">Log in here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
