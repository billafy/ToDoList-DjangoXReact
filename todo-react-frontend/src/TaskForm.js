import React, {useState, useContext} from 'react';
import {AppContext} from './App';

const TaskForm = () => {
	const {state:{titleInput, isUpdating}, handleTitleInput, addTask, updateTask} = useContext(AppContext);

	return (
		<>
			<section className='task-form'>
				<input type='text' value={titleInput} onChange={(event)=>handleTitleInput(event.target.value)}/>
				<button type='button' onClick={isUpdating ? updateTask : addTask}>{isUpdating ? 'UPDATE' : 'ADD'}</button>				
			</section>
		</>	
	);
}

export default TaskForm;