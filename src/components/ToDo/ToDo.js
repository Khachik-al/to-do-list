import React, { Component } from 'react';
// import styles from './style.module.css'
import { Container, Col, Row, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import TaskInput from '../inputTask/TaskInput';
import Confirm from '../Confirm';


class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasksId: new Set(),
        showModal: false,
        showAddTaskModal: false
    }

    onAdd = (newTask) => {
        let tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks,
            showAddTaskModal: false
        })
    }
    deleteTask = (taskId) => {
        let newSet = this.state.selectedTasksId;
        newSet.delete(taskId);
        this.setState({
            tasks: this.state.tasks.filter((el) => taskId !== el._id),
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
    toggleOpenNewTaskModal=()=>{
        this.setState({
            showAddTaskModal:!this.state.showAddTaskModal
        })
    }

    render() {
        const { tasks, selectedTasksId, showModal, showAddTaskModal } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
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
                    <Row className='justify-content-center text-center'>
                        <Col xs={4}>
                            <Button
                                onClick={this.toggleOpenNewTaskModal}
                                variant="primary"
                            >Add task</Button>
                        </Col>

                    </Row>
                    {tasks.length ?
                        <Row className='justify-content-center text-center'>

                            <Col xs={5}>
                                <Button variant="outline-danger" onClick={this.onToggleCloseModal}
                                    disabled={!selectedTasksId.size}>Delete selected</Button>
                            </Col>
                            <Col xs={5}>
                                <Button variant="outline-warning" onClick={this.onSelectAll}
                                >{selectedTasksId.size === tasks.length ? "Deselect All" : "Selecte All"}
                                </Button>
                            </Col>

                        </Row>
                        : null
                    }
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
            </div>
        );
    }
}

export default ToDo;