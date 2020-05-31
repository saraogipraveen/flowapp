import React from 'react';
import { NavLink } from 'react-router-dom';
import mail from '../../assets/icons/mail.svg'
import password from '../../assets/icons/password.svg'

function register(props) {

  return (
    <div className="flex p-2 justify-center items-center mt-40">
      <div className=" h-3/5 w-2/5 border  rounded shadow-2xl">
        <h1 className="p-4 text-center text-xl">Register</h1>
        <form className="flex flex-col">
          <input style={{ backgroundImage: `url(${mail})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Email" type="text" />
          <input style={{ backgroundImage: `url(${password})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Password" type="password" />
          <input style={{ backgroundImage: `url(${password})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className="border pl-8 border-black m-4 p-2 rounded" placeholder="Confirm Password" type="password" />
          

          <input type="submit" className="bg-blue-700 my-6 mx-6 h-10 text-white shadow rounded font-semibold" value="Sign Up" />
        </form>
        <NavLink to="login" className="flex justify-center mb-4 text-blue-400">Already have an account? Login here</NavLink>
      </div>
    </div>
  );
}

export default register;