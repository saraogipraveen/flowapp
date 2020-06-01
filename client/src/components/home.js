import React, { useState, useEffect, useContext } from 'react';
import plus from '../assets/icons/plus.svg';
import filter from '../assets/icons/filter.svg';
import tick from '../assets/icons/tick.svg';
import search from '../assets/icons/search.svg';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import { AuthContext } from '../context/AuthContext';
import Api from '../api';


const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed'
}

function Home(props) {

  const [workflows, setWorkflows] = useState({})
  const [searchText, setSearchText] = useState('')

  // const { user } = useContext(AuthContext);
  const token = localStorage.getItem('auth-token')
  const userId = localStorage.getItem('userId')

  const getWorkflows = async () => {
    const response = await Api.post('workflows/read', { userId: userId }, token)
    if (response.message) {
      const workflows = {};
      response.workflows.map(w => {
        workflows[w._id] = { ...w }
      })
      console.log("Home -> workflows", workflows)

      setWorkflows(workflows)
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
    const response = await Api.post('workflows/update', { id, name: workflows[id].name, status: workflows[id].workflow_status }, token)
    console.log("updateWorkflowName -> response", response)
  }

  const deleteWorkflow = async (id) => {
    const response = await Api._delete('workflows/delete', { workflowId: id }, token)
    console.log("updateWorkflowName -> response", response)
    getWorkflows();
  }

  const createWorkflow = async () => {
    const respone = await Api.post('workflows/create', { userId }, token)
    console.log("createWorkflow -> respone", respone)
    getWorkflows();
  }

  const searchHandler = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    const temp_workflows = {...workflows}
    const filteredWorkflows = Object.keys(temp_workflows).filter(id=>{
      return searchText === temp_workflows[id].name
    })
    console.log("searchHandler -> temp_workflows", temp_workflows)
    console.log("searchHandler -> filteredWorkflows", filteredWorkflows)
    setWorkflows(filteredWorkflows)
  }


  return (
    <div>
      <div className="flex justify-between border border-b py-5 px-3">
        <div className="flex">
          <input onChange={searchHandler} style={{ backgroundImage: `url(${search})`, backgroundRepeat: 'no-repeat', backgroundSize: '17px 17px', backgroundPosition: '8px 12px' }} className=" rounded-lg border border-black px-20 pl-8 py-1 mx-4 " type="text" value={searchText} placeholder="Search Workflows" />
          <button className="flex items-center shadow border border-black rounded p-2 pr-6  ml-4 "><img className="h-3 w-3 mx-1 mr-3" src={filter} alt="" />Filter</button>
        </div>
        <div>
          <button onClick={createWorkflow} className="flex items-center  rounded shadow bg-green-400 p-2 text-white"><img className="h-3 w-3 mx-1" src={plus} alt="plus" />Create Workflow</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 mx-10 my-10">
        {workflows && Object.keys(workflows).length ? Object.keys(workflows).map((id => {
          const workflow = workflows[id];
          const statusColor = workflow.workflow_status == STATUS.PENDING ? 'bg-gray-500' : 'bg-green-400'

          return (
            <div key={id} className="flex relative flex-col relative justify-between border border-black p-4 my-4 rounded shadow">
              <span onClick={() => deleteWorkflow(id)} className="cursor-pointer absolute right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 bg-red-600 rounded-full shadow"><img className="" src={deleteIcon} alt="delete" /></span>

              <input onBlur={() => updateWorkflow(id)} onChange={(e) => nameChangeHandler(id, e.target.value)} value={workflow.name} className="shadow bg-green-200 mb-2 border border-black shadow p-2" type="text" />
              <div className="mt-4 flex justify-between items-center">
                <span>{workflow.workflow_status && workflow.workflow_status.toUpperCase()}</span>
                <span onClick={() => toggleStatus(workflow)} className={`cursor-pointer right-minus-3by2 top-minus-3by2 h-10 w-10 p-3 rounded-full shadow ${statusColor}`}><img className="" src={tick} alt="tick" /></span>
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

export default Home;