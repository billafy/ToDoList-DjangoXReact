export const reducer = (state, action) => {
	if(action.type==='INIT_TASKS') {
		const tasks = action.payload.filter(task => task.username === state.username);
		return {
			...state,
			allTasks : tasks,
			tasks: tasks,
			tasksLoading: false,
		};
	}
	else if(action.type==='TASK_INPUT') {
		return {
			...state,
			titleInput: action.payload
		};
	}
	else if(action.type==='ADD_TASK') {
		return {
			...state,
			allTasks: [
				...state.allTasks,
				action.payload
			],
			tasks: [
				...state.tasks,
				action.payload
			],
			titleInput: '',
		};
	}
	else if(action.type==='INIT_UPDATE') {
		const taskToUpdate = state.tasks.filter(task => task.id===action.payload);
		return {
			...state,
			isUpdating: true,
			titleInput: taskToUpdate[0].title, 
			activeItem: taskToUpdate[0]
		}
	}
	else if(action.type==='UPDATE_TASK') {
		const newTasks = state.tasks.map(task => {
			if(task.id===action.payload.id)
				return action.payload;
			return task;
		});
		return {
			...state,
			isUpdating: false,
			titleInput: '',
			activeItem: {},
			tasks: newTasks,
			allTasks: newTasks,
		};
	}
	else if(action.type==='DELETE_TASK') {
		const newTasks = state.tasks.filter(task => task.id!==action.payload);
		return {
			...state,
			tasks: newTasks,
			allTasks: newTasks,
			activeItem: {},
			titleInput: '',
			isUpdating: false
		};
	}
	else if(action.type==='SIGN_IN') {
		return {
			...state,
			username: action.payload,
			signedIn: true,
		};
	}
	else if(action.type==='FILTER_TASKS') {
		if(action.payload==='All')
			return {...state, tasks: state.allTasks};
		const completed = action.payload === 'Complete' ? true : false;
		const newTasks = state.allTasks.filter(task => task.completed === completed);
		return {
			...state,
			tasks: newTasks
		};
	}
	return state;
}