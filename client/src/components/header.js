import React, { useContext } from 'react';
import flowicon from '../assets/icons/flowicon.svg';
import { AuthContext } from '../context/AuthContext';
import { withRouter } from 'react-router-dom';


function Header({history}) {

    const { user } = useContext(AuthContext)

    return (
        <div className="flex justify-between p-4 bg-pink-600">
            <div className="flex">
                <img className="mr-3 h-6 w-6" src={flowicon} alt="" />
                <span className="text-white text-lg">FLOWAPP</span>
            </div>

            {user ? <button className="bg-white px-3 py-1 rounded shadow">Logout</button>
                : <div>
                    <button className="bg-white px-3 py-1 mx-3 rounded shadow" onClick={() => history.push('/login')}>Login</button>
                    <button className="bg-white px-3 py-1 rounded shadow" onClick={() => history.push('/register')}>Register</button>
                </div>
            }
        </div>
    );
}

export default withRouter(Header);