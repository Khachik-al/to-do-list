import React, { PureComponent } from 'react';
import styles from './style.module.css'
import { Container, Col, Row, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import TaskInput from '../inputTask/TaskInput';
import Confirm from '../Confirm';
import EditTask from '../EditTask/EditTask';


class ToDo extends PureComponent {

    state = {
        tasks: [],
        selectedTasksId: new Set(),
        showModal: false,
        showAddTaskModal: false,
        editingTask: null,

    }
    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let task = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }
                this.setState({
                    tasks: task
                })

            })
            .catch((error) => {
                console.log("error ", error);

            })
    }

    onAdd = (newTask) => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let task = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }
                let tasks = [...this.state.tasks, task];
                this.setState({
                    tasks,
                    showAddTaskModal: false
                })


            })
            .catch((error) => {
                console.log("error ", error);

            })

    }
    deleteTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let task = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }
                let newSet = this.state.selectedTasksId;
                newSet.delete(taskId);
                this.setState({
                    tasks:task.filter((el) => taskId !== el._id),
                    selectedTasksId: newSet,
                }) 
            })
            .catch((error) => {
                console.log("error ", error);

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
        let { selectedTasksId, tasks } = this.state;
        let newTasks = tasks.filter((task) => {
            if (selectedTasksId.has(task._id)) {
                return false;
            }
            else { return true }
        })
        this.setState({
            tasks: newTasks,
            showModal: !this.state.showModal,
            selectedTasksId: new Set()
        })

    }
    onToggleCloseModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    onSelectAll = () => {
        if (this.state.selectedTasksId.size === this.state.tasks.length) {
            this.setState({
                selectedTasksId: new Set()
            })
        }
        else {
            let selectedTasks = this.state.tasks.map((task) => task._id)
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
    editTask = (task) => {
        this.setState({
            editingTask: task,
        })
    }
    onEdit = (editedTask) => {
        let tasks = this.state.tasks.map((el) => {
            if (el._id === editedTask._id) {
                return {
                    ...editedTask
                }

            }
            return el;
        })
        this.setState({
            tasks,
            editingTask: null
        })
    }

    render() {
        const { tasks, selectedTasksId, showModal, showAddTaskModal, editingTask } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        editTask={this.editTask}
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
                <h2>To Do List</h2>
                <Container >
                    <Row className='justify-content-center '>
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
                {showModal &&
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

export default ToDo;