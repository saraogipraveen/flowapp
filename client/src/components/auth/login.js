import React, {  useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import mail from '../../assets/icons/mail.svg'
import passwordIcon from '../../assets/icons/password.svg'
import Api from '../../api';


function Login({ history }) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await Api.post('users/login', { email, password })
      if (response.message) {
        localStorage.setItem('auth-token',response.token)
        localStorage.setItem('userId',response.userId)
        window.location.href= '/'
      }
    }
    catch (error) {
    }

  }

  return (
    <div className="flex p-2 justify-center items-center mt-40">
      <div className=" h-3/5 w-2/5 border  rounded shadow-2xl">
        <h1 className="p-4 text-center text-xl">Login</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Email" type="text" style={{ backgroundImage: `url(${mail})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Password" type="password" style={{ backgroundImage: `url(${passwordIcon})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} />
          

          <input type="submit" className="bg-blue-700 my-6 mx-6 h-10 text-white shadow rounded font-semibold cursor-pointer" value="Login" />
        </form>
        <NavLink to="register" className="flex justify-center mb-4 text-blue-400">Don't have an account? Sign up here</NavLink>
      </div>
    </div>
  );
}

export default withRouter(Login);