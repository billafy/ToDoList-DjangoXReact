import React, {useState, useReducer} from 'react';
import './task.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import {reducer} from './reducer';

const defaultStates = {
    allTasks: [],
    tasks: [],
    activeItem: {},
    isUpdating: false,
    titleInput: '',
    signedIn: false,
    username: '',
    tasksLoading: true
};

export const AppContext = React.createContext();

const App = () => {
    const [state, dispatch] = useReducer(reducer, defaultStates);
    const [usernameInput, setUsernameInput] = useState('');

    const getTasks = () => {
        fetch('api url for list of all tasks')
        .then(response => {
            return response.json();
        })    
        .then(data => {
            dispatch({type:'INIT_TASKS',payload:data});
        })
    }

    const handleTitleInput = (title) => {
        dispatch({type:'TASK_INPUT',payload:title});
    }

    const addTask = () => {
        const title = state.titleInput.trim();
        if(!title)
            return;
        fetch('api url to create a task', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                title: title,
                completed: false,
                username: state.username, 
            })
        })
        .then(response => response.json())
        .then(task => {
            dispatch({type:'ADD_TASK',payload:task});
        });
    }

    const initializeUpdate = (id) => {
        dispatch({type:'INIT_UPDATE',payload:id});
    }

    const toggleCompletion = (task) => {
        const url = 'api url to toggle completion status';
        fetch(url,{
           method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: task.title,
                completed: !task.completed,
                username: state.username,
            }),
        })
        .then(response => response.json())   
        .then(completedTask => {
            dispatch({type:'UPDATE_TASK',payload:completedTask});
        });
    }

    const updateTask = () => {
    	const newTitle = state.titleInput.trim();
    	if(!newTitle)
    		return;
        const url = 'api url to update title '+state.activeItem.id+'/task-update/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                completed: state.activeItem.completed,
                username: state.username,
            })
        })
        .then(response => response.json())
        .then(task => {
            dispatch({type:'UPDATE_TASK',payload:task})
        })
    }

    const deleteTask = (id) => {
        const url = 'api url to delete task'+id+'/task-delete/'
        fetch(url, {
            method: 'GET',
        })
        .then(response => {
            dispatch({type:'DELETE_TASK',payload:id});           
        })
    }

    const signIn = () => {
        const username = usernameInput.trim();
        if(!username)
            return;
        dispatch({type:'SIGN_IN',payload:username});
    }

    const filterTasks = (filterValue) => {
        dispatch({type:'FILTER_TASKS',payload:filterValue});
    }

    return (
        <AppContext.Provider value={{
                state, 
                getTasks,
                handleTitleInput,
                initializeUpdate, 
                addTask,
                toggleCompletion, 
                uncheckTask, 
                deleteTask,
                filterTasks,
            }}>
            <div className='task-container'>
                {
                    state.signedIn
                    ?
                    <>
                        <p className='username'>{state.username}'s To-Do-List</p>
                        <TaskForm/>
                        <TaskList/>
                    </>
                    :
                    <>
                        <section className='sign-in'>
                            <input type='text' placeholder='Enter a name' value={usernameInput} onChange={(event)=>setUsernameInput(event.target.value)}/>
                            <br/>
                            <button type='submit' onClick={signIn}>CONFIRM</button>                            
                        </section>
                    </>                    
                }
            </div>
        </AppContext.Provider>
    );
}

export default App;
