import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import mail from '../../assets/icons/mail.svg'
import passwordIcon from '../../assets/icons/password.svg'
import Api from '../../api';

function Register({history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await Api.post('users/register', { email, password })
      console.log("submitHandler -> response", response)
      if (response.message) {
        alert('Registered Success')
        history.push('/login')
      }
    }
    catch (error) {
      console.log("submitHandler -> error", error)
    }

  }


  return (
    <div className="flex p-2 justify-center items-center mt-40">
      <div className=" h-3/5 w-2/5 border  rounded shadow-2xl">
        <h1 className="p-4 text-center text-xl">Register</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ backgroundImage: `url(${mail})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Email" type="text" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundImage: `url(${passwordIcon})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Password" type="password" />


          <input type="submit" className="bg-blue-700 my-6 mx-6 h-10 text-white shadow rounded font-semibold" value="Sign Up" />
        </form>
        <NavLink to="login" className="flex justify-center mb-4 text-blue-400">Already have an account? Login here</NavLink>
      </div>
    </div>
  );
}

export default withRouter(Register);