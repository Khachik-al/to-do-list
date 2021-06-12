import React, { PureComponent } from 'react';
import styles from './style.module.css'
import { Container, Col, Row, Button } from 'react-bootstrap';
import Task from '../../Task/Task';
import TaskInput from '../../inputTask/TaskInput';
import Confirm from '../../Confirm';
import EditTask from '../../EditTask/EditTask';
import { connect } from 'react-redux';
import request from '../../../helpers/request';


class ToDo extends PureComponent {

    state = {
        selectedTasksId: new Set(),
        showConfirm: false,
        showAddTaskModal: false,
        editingTask: null,

    }

    componentDidMount() {
        this.props.getTasks()
    }


    onAdd = (newTask) => {
        this.props.postTask(newTask)
        this.setState({
            showAddTaskModal: false
        })
    }

    deleteTask = (taskId) => {
        let newSet = this.state.selectedTasksId;
        newSet.delete(taskId);
        this.props.deleteTask(taskId)
        this.setState({
            selectedTasksId: newSet
        })
    }

    selectTasks = (taskId) => {
        let selectedTasksId = new Set(this.state.selectedTasksId)
        selectedTasksId.has(taskId) ? selectedTasksId.delete(taskId) : selectedTasksId.add(taskId);
        this.setState({
            selectedTasksId
        });
    };
    deleteSelectedTasks = () => {
        let { selectedTasksId } = this.state;

        let selectedTasks = this.props.tasks.filter((task) => {
            if (selectedTasksId.has(task._id)) {
                return false;
            }
            else { return true }
        })

        this.props.deleteSelected(selectedTasks, selectedTasksId)
        this.setState({
            showConfirm: !this.state.showConfirm,
            selectedTasksId: new Set()
        })
    }

    onToggleCloseModal = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    onSelectAll = () => {
        if (this.state.selectedTasksId.size === this.props.tasks.length) {
            this.setState({
                selectedTasksId: new Set()
            })
        }
        else {
            let selectedTasks = this.props.tasks.map((task) => task._id)
            this.setState({
                selectedTasksId: new Set(selectedTasks)
            })
        }
    }
    toggleOpenNewTaskModal = () => {
        this.setState({
            showAddTaskModal: !this.state.showAddTaskModal
        })
    }
    toggleOpenEditTaskModal = () => {
        this.setState({
            editingTask: null
        })
    }
    onEditTask = (task) => {
        this.setState({
            editingTask: task,
        })
    }
    onEdit = (editedTask) => {
        let tasks = this.props.tasks.map((el) => {
            if (el._id === editedTask._id) {
                return {
                    ...editedTask
                }
            }
            return el;
        })
        this.props.editTasks(editedTask, tasks)
        this.setState({
            editingTask: null
        })
    }

    render() {
        const { selectedTasksId, showConfirm, showAddTaskModal, editingTask } = this.state;
        const { tasks } = this.props
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        editTask={this.onEditTask}
                        data={task}
                        selectTasks={this.selectTasks}
                        deleteTask={this.deleteTask}
                        selected={selectedTasksId.has(task._id)}
                    />
                </Col>
            )
        })
        return (
            <div>
                <Container className="mt-3">
                    <Row className='justify-content-center'>
                        {tasks.length ?
                            <Col xs={4} className={styles.deleteSelectedButton}>
                                <Button variant="danger" onClick={this.onToggleCloseModal}
                                    disabled={!selectedTasksId.size}>Delete selected</Button>
                            </Col>
                            : null
                        }
                        <Col xs={4} className='text-center'>
                            <Button
                                onClick={this.toggleOpenNewTaskModal}
                                variant="primary" disabled={!!selectedTasksId.size}
                            >Add task</Button>
                        </Col>
                        {tasks.length ?
                            <Col xs={4}>
                                <Button variant="warning" onClick={this.onSelectAll}
                                >{selectedTasksId.size === tasks.length ? "Deselect All" : "Selecte All"}
                                </Button>
                            </Col>
                            : null
                        }
                    </Row>
                    <Row className='justify-content-center'>
                        {taskComponents}
                    </Row>
                </Container>
                {showConfirm &&
                    <Confirm
                        onClose={this.onToggleCloseModal}
                        count={selectedTasksId.size}
                        onConfirm={this.deleteSelectedTasks}
                    />
                }
                {showAddTaskModal &&
                    <TaskInput
                        onAdd={this.onAdd}
                        onClose={this.toggleOpenNewTaskModal}
                    />
                }
                {editingTask &&
                    <EditTask
                        onEdit={this.onEdit}
                        editingTask={this.state.editingTask}
                        onClose={this.toggleOpenEditTaskModal}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

let mapDispatchtoProps = {
    getTasks: () => {
        return (dispatch) => {
            request('http://localhost:3001/task').then((tasks) => {
                dispatch({ type: "GET_TASKS", tasks: tasks })
            })
        }
    },
    postTask: (newTask) => {
        return (dispatch) => {
            request('http://localhost:3001/task', 'POST', newTask).then((task) => {
                dispatch({ type: "POST_TASK", task: task })
            })
        }
    },
    deleteTask: (taskId) => {
        return (dispatch) => {
            request(`http://localhost:3001/task/${taskId}`, 'DELETE').then(() => {
                dispatch({ type: "DELETE_TASK", taskId: taskId })
            })
        }
    },
    deleteSelected: (tasks, selectedTasksId) => {
        return (dispatch) => {
            request(
                `http://localhost:3001/task/`,
                'PATCH',
                { tasks: Array.from(selectedTasksId) })
                .then(() => {
                    dispatch({ type: "DELETE_SELECTED", selectedTasks: tasks })
                })
        }
    },
    editTasks: (editedTask, tasks) => {
        return (dispatch) => {
            request(
                `http://localhost:3001/task/${editedTask._id}`,
                'PUT',
                { ...editedTask })
                .then(() => {
                    dispatch({ type: "EDIT_TASK", tasks: tasks })
                })
        }
    },
}
export default connect(mapStateToProps, mapDispatchtoProps)(ToDo);



