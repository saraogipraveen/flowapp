import React from 'react';
import plus from '../assets/icons/plus.svg';
import filter from '../assets/icons/filter.svg';
import tick from '../assets/icons/tick.svg';
import search from '../assets/icons/search.svg';
import deleteIcon from '../assets/icons/deleteIcon.svg';

const workflows = [
  { name: 'WORKFLOW 1', status: 'COMPLETED' },
  { name: 'WORKFLOW 2', status: 'PENDING' },
  { name: 'WORKFLOW 2', status: 'PENDING' },
  { name: 'WORKFLOW 2', status: 'PENDING' },
  { name: 'WORKFLOW 2', status: 'PENDING' },
];

function home(props) {
  return (
    <div>
      <div className="flex justify-between border border-b py-5 px-3">
        <div className="flex">
          <input style={{ backgroundImage: `url(${search})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className=" rounded-lg border border-black px-20 pl-8 py-1 mx-4 " type="text" value="" placeholder="Search Workflows" />
          <button className="flex items-center shadow border border-black rounded p-2 pr-6  ml-4 "><img className="h-3 w-3 mx-1 mr-3" src={filter} alt="" />Filter</button>
        </div>
        <div>
          <button className="flex items-center  rounded shadow bg-green-400 p-2 text-white"><img className="h-3 w-3 mx-1" src={plus} alt="plus" />Create Workflow</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 mx-10 my-10">
        {workflows.map((workflow => {
          return (
            <div className="flex relative flex-col relative justify-between border border-black p-4 my-4 rounded shadow">
              <span className=" absolute right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 bg-red-600 rounded-full shadow"><img className="" src={deleteIcon} alt="delete" /></span>

              <input className="shadow bg-green-200 mb-2 border border-black shadow p-2" type="text" value={workflow.name} />
              <div className="mt-4 flex justify-between items-center">
                <span>{workflow.status}</span>
                <span className="right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 bg-green-400 rounded-full shadow"><img className="" src={tick} alt="tick" /></span>
              </div>
            </div>
          )
        }))}
      </div>
    </div>
  );
}

export default home;