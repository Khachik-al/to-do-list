import { checkLoginStatus } from "../helpers/storage"
import { PENDING } from "./actionTypes"

const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    successMessage: '',
    errorMessage: '',
    isAuthenticated: checkLoginStatus()
}


export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case 'GET_TASKS': {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            }
        }
        case 'GET_TASK': {
            return {
                ...state,
                loading: false,
                singleTask: action.task
            }
        }
        case PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                successMessage: 'Task created successfully!!!'
            }
        }

        case "DELETE_TASK": {
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter((el) => action.taskId !== el._id),
                successMessage: 'Task deleted successfully!!!'
            }
        }
        case "DELETE_SELECTED": {
            return {
                ...state,
                loading: false,
                tasks: action.selectedTasks,
                successMessage: 'Tasks deleted successfully!!!'
            }
        }
        case 'EDIT_TOGGLE': {
            return {
                ...state,
                loading: false,
                editingTask: state.editingTask ? null : action.task,
            }
        }
        case "EDIT_TASK": {

            return {
                ...state,
                tasks: action.tasks,
                editingTask: null,
                loading: false,
                singleTask: action.singleTask,
                successMessage: 'Task edited successfully!!!'
            }
        }
        case 'ERROR': {
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage
            }
        }
        case 'ACTIVE_DONE': {
            return {
                ...state,
                successMessage: 
                action.status === 'active' ? 'Task is active' : 'Congrets your task is done',
                loading: false,

            }
        }
        case 'CONTACT': {
            return {
                ...state,
                successMessage: 'Contact message has sent successfully',
                loading: false,

            }
        }
        case 'REGISTER': {
            return {
                ...state,
                loading: false,
                successMessage: 'You registered successfully'
                

            }
        }
        case 'SIGHN_IN': {
            return {
                ...state,
                loading: false,
                successMessage: 'Welcome',
                isAuthenticated: true
            }
        }


        default: return state;

    }
}