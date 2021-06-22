import request from "../helpers/request"
import { PENDING } from "./actionTypes"

let APIHost=process.env.REACT_APP_API_HOST

export function getTasks(params = {}) {

     let query=Object.entries(params).map(([key,value])=>`${key}=${value}`).join('&')
 console.log(`${APIHost}/task?${query}`);

    return (dispatch) => {
        dispatch({ type: PENDING })
        request(`${APIHost}/task?${query}`).then((tasks) => {
            dispatch({ type: "GET_TASKS", tasks: tasks })
        })
        .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}
export function getSingleTask(taskId) {
    return (dispatch) => {
        dispatch({ type: PENDING })
        request(`${APIHost}/task/${taskId}`).then((task) => {
            dispatch({ type: "GET_TASK", task: task })
        })
        .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}
export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: PENDING })
        request(`${APIHost}/task`, 'POST', newTask).then((task) => {
            dispatch({ type: "ADD_TASK", task })
        })
        .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}
export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({ type: PENDING })
        request(`${APIHost}/task/${taskId}`, 'DELETE').then(() => {
            dispatch({ type: "DELETE_TASK", taskId: taskId })
        })
            .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}
export function deleteSelected(tasks, selectedTasksId) {
    return (dispatch) => {
        dispatch({ type: PENDING })
        request(
            `${APIHost}/task/`,
            'PATCH',
            { tasks: Array.from(selectedTasksId) })
            .then(() => {
                dispatch({ type: "DELETE_SELECTED", selectedTasks: tasks })
            })
            .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}
export function editTaskToggle(task) {
    return (dispatch) => {
        dispatch({ type: 'EDIT_TOGGLE', task: task })
    }
}
export function editTasks(editedTask, tasks) {

    return (dispatch) => {
        dispatch({ type: PENDING })
        let newTasks = tasks.map((el) => {
            if (el._id === editedTask._id) {
                return {
                    ...editedTask
                }
            }
            return el;
        })
        request(
            `${APIHost}/task/${editedTask._id}`,
            'PUT',
            editedTask)
            .then(() => {
                dispatch({ type: "EDIT_TASK", tasks: newTasks, singleTask: editedTask })
            })
            .catch((error) => {
                dispatch({ type: "ERROR", errorMessage: error.message })
            })
    }
}