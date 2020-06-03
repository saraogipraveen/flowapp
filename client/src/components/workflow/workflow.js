import React, { useEffect, useState } from 'react';
import tick from '../../assets/icons/tick.svg';
import rightarrow from '../../assets/icons/rightarrow.svg';
import shuffle from '../../assets/icons/shuffle.svg';
import plus from '../../assets/icons/plus.svg';
import cross from '../../assets/icons/cross.svg';
import { withRouter } from 'react-router-dom';
import Api from '../../api';
import { STATUS } from '../../App';

function Workflow(props) {

  const [workflowNodes, setWorkflowNodes] = useState({})
  const [workflowName, setWorkflowName] = useState('')
  const token = localStorage.getItem('auth-token')
  const { workflowId } = props.match.params



  const getNodes = async () => {

    const response = await Api.get('nodes/read/' + workflowId, token)
    setWorkflowNodes(response.data)
    setWorkflowName(response.data.name)
  }


  const updateWorkflow = async () => {
    await Api.post('workflows/update', { id: workflowId, name: workflowName, status: workflowNodes.workflow_status }, token)
  }

  useEffect(() => {
    getNodes();

  }, [])

  const shuffleHandler = () => {
  console.log("shuffleHandler -> shuffleHandler")

  }

  const deleteHandler = async () => {
    const { nodes } = workflowNodes;
    if (nodes.length) {
      const nodeId = nodes[nodes.length - 1]._id
      await Api._delete('nodes/delete', { nodeId }, token)
      getNodes();
    }
  }

  const addNodeHandler = async () => {
    await Api.post('nodes/create', { workflowId }, token)
    getNodes();
  }

  const saveHandler = async() => {
    await Api.post('nodes/create', workflowNodes.nodes, token)
    getNodes();
  }



  const nodeNameChangeHandler = (id, title) => {
    const { nodes } = workflowNodes;
    const index = nodes.findIndex((n) => n._id === id)
    nodes[index].title = title;
    setWorkflowNodes({ ...workflowNodes, ...nodes })
  }

  const nodeDescChangeHandler = (id, desc) => {
    const { nodes } = workflowNodes;
    const index = nodes.findIndex((n) => n._id === id)
    nodes[index].desc = desc;
    setWorkflowNodes({ ...workflowNodes, ...nodes })
  }

  const statusHandler = (node) => {
    console.log("statusHandler -> node", node)
    console.log("statusHandler -> STATUS.PENDING", STATUS.PENDING)
    const status = node.node_status;
    const { nodes } = workflowNodes;
    const index = nodes.findIndex((n) => n._id === node._id)
    switch (status) {
      case STATUS.PENDING:
        nodes[index].node_status = STATUS.PROGRESS
        break;
      case STATUS.PROGRESS:
        nodes[index].node_status = STATUS.COMPLETED
        break;
      case STATUS.COMPLETED:
        nodes[index].node_status = STATUS.PENDING
        break;
    }
    setWorkflowNodes({ ...workflowNodes, ...nodes })


  }

  return (
    <div>
      <div className="flex justify-between  py-5 px-3 border-b border-black shadow">
        <div>
          <input onBlur={() => updateWorkflow()} onChange={(e) => setWorkflowName(e.target.value)} className="border border-black p-2 shadow-lg" type="text" value={workflowName} />
        </div>
        <div className="flex">
          <button onClick={shuffleHandler} className="opacity-50 cursor-not-allowed flex items-center px-3 mx-1 bg-purple-800 text-white rounded "><img className="h-4 w-4 mr-2 " src={shuffle} alt="" /> Shuffle</button>
          <button onClick={deleteHandler} className="flex items-center px-3 mx-1 bg-red-600 text-white rounded "><img className="h-3 w-3 mr-2" src={cross} alt="" /> Delete</button>
          <button onClick={addNodeHandler} className="flex items-center px-3 mx-1 bg-green-600 text-white rounded "><img className="h-3 w-3 mr-2" src={plus} alt="" /> Add Note</button>
          <button onClick={saveHandler} className=" px-3 mx-1 bg-blue-600 text-white rounded "> Save</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12 mx-10 my-10">
        {
          workflowNodes.nodes && workflowNodes.nodes.length > 0 ? workflowNodes.nodes.map((node, index) => {

            let tickColor = 'bg-gray-400';
            let hoverTickColor = 'hover:bg-gray-400'
            switch (node.node_status) {
              case STATUS.PENDING:
                tickColor = 'bg-gray-400'
                hoverTickColor = 'hover:bg-gray-500'
                break;
              case STATUS.PROGRESS:
                tickColor = 'bg-blue-400'
                hoverTickColor = 'hover:bg-blue-500'
                break;
              case STATUS.COMPLETED:
                tickColor = 'bg-green-400'
                hoverTickColor = 'hover:bg-green-500'
                break;
            }

            return <div className="flex flex-col cursor-pointer relative justify-between border border-black p-4 my-4 rounded shadow">
              <span onClick={() => statusHandler(node)} className={`absolute right-minus-3by2 top-minus-3by2 h-10 w-10  p-3 ${tickColor} ${hoverTickColor} rounded-full shadow`}><img className="" src={tick} alt="tick" /></span>
              {((index + 1) % 4 !== 0 && index + 1 !== workflowNodes.length && workflowNodes.length == 1) ?
                <span className="absolute float-right left-100 w-12 mt-20">
                  <img className="" src={rightarrow} alt="rightarrow" /></span> : ''}
              <input onChange={(e) => nodeNameChangeHandler(node._id, e.target.value)} className="shadow bg-green-200 mb-2 border border-black shadow p-3" type="text" value={node.title} />
              <textarea onChange={(e) => nodeDescChangeHandler(node._id, e.target.value)} className="bg-blue-200 h-64 resize-none h-72 overflow-scroll p-2 border border-black shadow">{node.desc}</textarea>
            </div>
          })
            : <div>Getting Nodes... </div>
        }
      </div>
    </div>
  );
}

export default withRouter(Workflow);