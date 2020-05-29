import React from 'react';
import {NavLink} from 'react-router-dom';

function login(props) {

  return (
    <div className="flex p-2 justify-center items-center h-screen">
      <div className=" h-3/5 w-4/6 border  rounded shadow-2xl">
        <h1 className="p-4 text-center text-xl">Login</h1>
        <form className="flex flex-col">

          <input className="border border-black m-4 p-2 rounded" placeholder="Email" type="text" />
          <input className="border border-black m-4 p-2 rounded" placeholder="Password" type="text" />

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