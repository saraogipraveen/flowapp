import React from 'react';
import {NavLink} from 'react-router-dom';
import mail from '../assets/icons/mail.svg';
import password from '../assets/icons/password.svg'

function login(props) {

  return (
    <div className="flex p-2 justify-center items-center h-screen">
      <div className=" h-3/5 w-2/5 border  rounded shadow-2xl">
        <h1 className="p-4 text-center text-xl">Login</h1>
        <form className="flex flex-col">

        <input style={{ backgroundImage: `url(${mail})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Email" type="text" />
        <input style={{ backgroundImage: `url(${password})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Password" type="password" />


          <div className="flex p-2 items-center ml-2">
            <input type="checkbox" id="remember_me" /><label className="ml-2" for="remember_me">Remember me</label>
          </div>

          <input type="submit" className="bg-blue-700 my-6 mx-6 h-10 text-white shadow rounded font-semibold" value="Login" />
        </form>
        {/* <NavLink to="">Don't have an account? Sign up here</NavLink> */}
      </div>
    </div>
  );
}

export default login;