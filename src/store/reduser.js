
const defaultState = {
    tasks: []
}


export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case 'GET_TASKS': {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case 'POST_TASK': {
            return {
                ...state,
                tasks: [...state.tasks,action.task]
            }
        }
        case "DELETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.filter((el) => action.taskId !== el._id)
            }
        }
        case "DELETE_SELECTED": {
            return {
                ...state,
                tasks: action.selectedTasks
            }
        }
        case "EDIT_TASK": {
            return {
                ...state,
                tasks: action.tasks
            }
        }


        default: return state;

    }
}