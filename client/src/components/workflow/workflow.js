import React from 'react';
import Header from '../header';
import tick from '../../assets/icons/tick.svg';
import rightarrow from '../../assets/icons/rightarrow.svg';

function workflow(props) {

  const workflowsNodes = [{ note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' },
  { note: 'new note', desc: 'this is the description' }]



  return (
    <div>
      <div className="flex justify-between  py-5 px-3 border-b border-black shadow">
        <div>
          <input className="border border-black p-2 shadow-lg" type="text" value="workflow name " />
        </div>
        <div className="flex">
          <button className="px-3 mx-1 bg-purple-800 text-white rounded ">Shuffle</button>
          <button className="px-3 mx-1 bg-red-600 text-white rounded ">Delete</button>
          <button className="px-3 mx-1 bg-green-600 text-white rounded ">Add Note</button>
          <button className="px-3 mx-1 bg-blue-600 text-white rounded ">Save</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 mx-10 my-10">
        {
          workflowsNodes.map((node, index) => {
            return <div className="flex flex-col relative justify-between border border-black p-4 my-4 rounded shadow">
              <span className="absolute right-minus-3by2 top-minus-3by2 h-10 w-10  p-3 bg-green-400 rounded-full shadow"><img className="" src={tick} alt="tick" /></span>
              {((index + 1) % 4 !== 0 && index + 1 !== workflowsNodes.length) ?
                <span className="absolute float-right left-100 w-12 mt-20">
                  <img className="" src={rightarrow} alt="rightarrow" /></span> : ''}
              <input className="shadow bg-green-200 mb-2 border border-black shadow p-3" type="text" value={node.note} />
              <textarea className="bg-blue-200 h-64 resize-none h-72 overflow-scroll p-2 border border-black shadow">{node.desc}</textarea>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default workflow;