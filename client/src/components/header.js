import React from 'react';
import flowicon from '../assets/flowicon.png';

function header(props) {
    return (
        <div className="flex justify-between p-4 bg-pink-600">
            <div className="flex">
                <img className="mr-3" src={flowicon} alt="" />
                <span className="text-white text-lg">FLOWAPP</span>
            </div>

            <button className="bg-white px-3 py-1 rounded shadow">Logout</button>
        </div>
    );
}

export default header;