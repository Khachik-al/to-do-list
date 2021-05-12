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
        showModal: false
    }


    onAdd = (newTask) => {
        let tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks,
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

    render() {
        const { tasks, selectedTasksId, showModal } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        data={task}
                        selectTasks={this.selectTasks}
                        deleteTask={this.deleteTask} />
                </Col>
            )
        })

        return (
            <div>
                <Container >
                    <Row className='justify-content-center'>
                        <Col className='col-10'>
                            <TaskInput
                                onAdd={this.onAdd}
                                selectedTasksId={selectedTasksId} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center text-center'>
                        <Col xs={6}>
                            <Button variant="outline-danger" onClick={this.onToggleCloseModal}
                                disabled={!selectedTasksId.size}>Delete selected tasks</Button>
                        </Col>
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
            </div>
        );
    }
}

export default ToDo;