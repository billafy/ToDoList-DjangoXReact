import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './App';
import {MdDone, MdEdit, MdClose} from 'react-icons/md';

const TaskList = () => {
	const [filterValue, setFilterValue] = useState('All');
	const {state:{tasks, tasksLoading}, getTasks, initializeUpdate, deleteTask, toggleCompletion,filterTasks} = useContext(AppContext);

	useEffect(() => {
		getTasks();
	}, []);

	useEffect(() => {
		filterTasks(filterValue);
	}, [filterValue]);

	return (
		<>
			<section className='task-list'>
				<select value={filterValue} onChange={(event)=>setFilterValue(event.target.value)}>
					<option>
						All
					</option>
					<option>
						Incomplete
					</option>
					<option>
						Complete
					</option>							
				</select>
				{
					!tasksLoading 
					?
					tasks.map(task => {
						return(
							<div className='task-item' key={task.id}>
								{
									task.completed 
									?
									<>
										<p className='task-completed'><s onClick={()=>toggleCompletion(task)}>{task.title}</s></p>
										<button type='button' style={{color:'red'}} onClick={()=>deleteTask(task.id) }>
											<MdClose/>
										</button>
									</>
									:
									<>
										<p className='task-incompleted'>{task.title}</p>
										<button type='button' style={{color:'green'}} onClick={()=>toggleCompletion(task)}>
											<MdDone/>
										</button>
										<button type='button' style={{color:'skyblue'}} onClick={()=>initializeUpdate(task.id) }>
											<MdEdit/>
										</button>
										<button type='button' style={{color:'red'}} onClick={()=>deleteTask(task.id)}>
											<MdClose/>
										</button>
										
									</>
								}
							</div>	
						);
					})
					:
					<div className='loading'></div>	
				}
			</section>
		</>	
	);
}

export default TaskList;