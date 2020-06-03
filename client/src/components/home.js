import React, { useState, useEffect } from 'react';
import plus from '../assets/icons/plus.svg';
import filter from '../assets/icons/filter.svg';
import tick from '../assets/icons/tick.svg';
import search from '../assets/icons/search.svg';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import Api from '../api';
import { withRouter } from 'react-router-dom';
import {STATUS} from '../App';


function Home({history}) {

  const [workflows, setWorkflows] = useState({})
  const [filteredWorkflows, setFilteredWorkflows] = useState({})
  const [searchText, setSearchText] = useState('')

  const token = localStorage.getItem('auth-token')
  const userId = localStorage.getItem('userId')

  const getWorkflows = async () => {
    const response = await Api.post('workflows/read', { userId: userId }, token)
    if (response.message) {
      const workflows = {};
      response.workflows.map(w => {
        workflows[w._id] = { ...w }
      })

      setWorkflows(workflows)
      setFilteredWorkflows(workflows)
    }
  }

  useEffect(() => {
    getWorkflows();
  }, [])

  const toggleStatus = async ({ _id, workflow_status, name }) => {

    const status = workflow_status === STATUS.PENDING ? 'completed' : 'pending'

    const response = await Api.post('workflows/update', { id: _id, status, name }, token)
    getWorkflows();

    if (response.message) {
      alert(response.message)
    }

  }

  const nameChangeHandler = (id, name) => {
    workflows[id].name = name;
    setWorkflows({ ...workflows })
  }

  const updateWorkflow = async (id) => {
    await Api.post('workflows/update', { id, name: workflows[id].name, status: workflows[id].workflow_status }, token)
  }

  const deleteWorkflow = async (id) => {
    await Api._delete('workflows/delete', { workflowId: id }, token)
    getWorkflows();
  }

  const createWorkflow = async () => {
    await Api.post('workflows/create', { userId }, token)
    getWorkflows();
  }

  const searchHandler = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    const temp_workflows = { ...workflows }
    const filteredWorkflows = {};
    Object.keys(temp_workflows).map(id => {

      if (temp_workflows[id].name.indexOf(searchText) > -1) {
        filteredWorkflows[id] = { ...temp_workflows[id] }
      }
    })
    setFilteredWorkflows(searchText ? filteredWorkflows : temp_workflows)
  }


  return (
    <div>
      <div className="flex justify-between border border-b py-5 px-3">
        <div className="flex">
          <input onChange={searchHandler} style={{ backgroundImage: `url(${search})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className=" rounded-lg border border-black px-20 pl-8 py-1 mx-4 " type="text" value={searchText} placeholder="Search Workflows" />
          <button className="flex items-center shadow border border-black rounded p-2 pr-6  ml-4 "><img className="h-3 w-3 mx-1 mr-3" src={filter} alt="" />Filter</button>
        </div>
        <div>
          <button onClick={createWorkflow} className="flex items-center  rounded shadow bg-green-400 hover:bg-green-600 p-2 text-white"><img className="h-3 w-3 mx-1" src={plus} alt="plus" />Create Workflow</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 mx-10 my-10">
        {filteredWorkflows && Object.keys(filteredWorkflows).length ? Object.keys(filteredWorkflows).map((id => {
          const workflow = filteredWorkflows[id];
          const statusColor = workflow.workflow_status == STATUS.PENDING ? 'bg-gray-500' : 'bg-green-400'
          const hoverColor = workflow.workflow_status == STATUS.PENDING ? 'hover:bg-gray-400' : 'hover:bg-green-300'

          return (
            <div onClick={() => history.push('/workflow/' + id)} key={id} className="hover:bg-pink-200 flex relative cursor-pointer flex-col relative justify-between border border-black p-4 my-4 rounded shadow">
              <span onClick={(e) => {e.stopPropagation(); deleteWorkflow(id)}} className="hover:bg-red-400 cursor-pointer absolute right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 bg-red-600 rounded-full shadow"><img className="" src={deleteIcon} alt="delete" /></span>

              <input onBlur={() => updateWorkflow(id)} onClick={(e)=> e.stopPropagation()} onChange={(e) => { nameChangeHandler(id, e.target.value)}} value={workflow.name} className="shadow bg-green-200 mb-2 border border-black shadow p-2" type="text" />
              <div className="mt-4 flex justify-between items-center">
                <span>{workflow.workflow_status && workflow.workflow_status.toUpperCase()}</span>
                <span onClick={(e) => {e.stopPropagation(); toggleStatus(workflow)}} className={`cursor-pointer right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 rounded-full shadow ${statusColor} ${hoverColor}`}><img className="" src={tick} alt="tick" /></span>
              </div>
            </div>
          )
        })) :
          <div>Getting Your Workflows...</div>
        }
      </div>
    </div>
  );
}

export default withRouter(Home);