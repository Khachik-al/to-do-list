import React, { Component } from 'react'
// import styles from './style.module.css'
import { Container, Col, Row, Button } from 'react-bootstrap'
import idGenerator from '../../helpers/idGenerator'
import Task from '../Task/Task'
import TaskInput from '../inputTask/TaskInput'


class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [],
        selectedTasksId: new Set()
    }
    handleChenge = (ev) => {
        this.setState({
            inputValue: ev.target.value
        })
    }
    addTask = () => {
        let inputValue = this.state.inputValue.trim();
        if (!inputValue) { return; }
        const newTask = {
            title: this.state.inputValue,
            _id: idGenerator()
        }
        let tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks,
            inputValue: ''
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
    addTaskKyeDown = (ev) => {
        if (ev.key !== 'Enter') { return; }
        this.addTask()
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
            selectedTasksId: new Set()
        })

    }

    render() {
        const { tasks, inputValue, selectedTasksId } = this.state;
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
            <Container >
                <Row className='justify-content-center'>
                    <Col className='col-10'>
                        <TaskInput
                            inputValue={inputValue}
                            selectedTasksId={selectedTasksId}
                            handleChenge={this.handleChenge}
                            addTask={this.addTask}
                            addTaskKyeDown={this.addTaskKyeDown} />
                    </Col>
                </Row>
                <Row className='justify-content-center text-center'>
                    <Col xs={6}>
                        <Button variant="outline-danger" onClick={this.deleteSelectedTasks}
                            disabled={!selectedTasksId.size}>Delete selected tasks</Button>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    {taskComponents}
                </Row>
            </Container>
        );
    }
}

export default ToDo;