import React, { useState, useEffect } from 'react'
import {FormFeild} from "../components"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const initialValues = {name:"" , email:"", password:"", confirmPassword:""}
const Userin = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState(initialValues)
    const [isUser, SetUser] = useState(true)
    

    useEffect(()=>{
        setForm(initialValues)
    }, [isUser])
    
    const handleChange = (e) =>{
        setForm({...form, 
            [e.target.name] : e.target.value})
    
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            const response = await fetch("http://localhost:8080/api/v1/userin",
                {
                    method:"POST",
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({...form, isUser})
                }
            )
            if(response.ok){
                const data = await response.json(); // Parse the JSON data
                // console.log("Login/Register successful:", data.token);
                localStorage.setItem('token', data.token)
                // console.log("data - ",data);
                // console.log("meeeee",(data.register));
                localStorage.setItem('user', JSON.stringify(data.register));
                navigate(`/userin/create-post`)
                
            }
            
            // console.log(response)

            
        } catch (error) {
            console.log("oops")
            alert(error)
        }
    }

  return (
<div className=" flex items-center justify-center w-full">
	<div className="bg-white dark:bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-600">{isUser ? "First you need to Log in..." : "Create an account"}</h1>
		<form>
			<div className="mb-4">
                {!isUser && ( 
                <>
                <label  className="block text-sm font-medium text-gray-700 dark:text-gray-600 mt-3 mb-2">Your name</label>				
                <input value={form.name} onChange={handleChange} name="name" type='text' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your name" required />    
                </>
                )}
				<label  className="block text-sm font-medium text-gray-700 dark:text-gray-600 mt-3 mb-2">Email Address</label>
				<input value={form.email} onChange={handleChange} type="email" name='email'  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
			</div>
			<div className="mb-4">
                
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">Password</label>
				<input value={form.password} onChange={handleChange} type="password" name='password'  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
				{isUser && (<button onClick={()=>{SetUser(false)}} className='mt-2 text-blue-700 text-sm'>Don't have an account?</button>)}
                {!isUser && (
                    <>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mt-3 mb-2">Re-enter your password</label>				
                    <input value={form.confirmPassword} onChange={handleChange} type="password" name='confirmPassword'  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Re-enter your password" required />
                    <button onClick={()=>{SetUser(true)}} className='mt-2 text-blue-700 text-sm'>Have an account?</button>
                    </>)}
			</div>
			
			<button onClick={handleSubmit} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isUser ? "Log in" : "Create account"}
                </button>
		</form>
	</div>
</div>
  )
}

export default Userin