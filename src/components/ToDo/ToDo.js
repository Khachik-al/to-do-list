import React, { Component } from 'react'
import styles from './style.module.css'
import { Container, Col, Row, Card, FormControl, Button, InputGroup } from 'react-bootstrap'
import idGenerator from '../../helpers/idGenerator'


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
        if (selectedTasksId.has(taskId)) {
            selectedTasksId.delete(taskId)
        }
        else {
            selectedTasksId.add(taskId)
        }
        this.setState({
            selectedTasksId
        });
    };
    deleteTasks = () => {
        // if(!this.state.selectedTasksId){return}
        // this.state.selectedTasksId.forEach((el)=>this.deleteTask(el))??
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
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className={`${styles.task} mt-3`}>
                        <Card.Body>
                            <input type="checkbox" style={{ transform: 'scale(1.3)' }}
                                onChange={() => { this.selectTasks(task._id) }}
                            />
                            <Card.Title className='mt-1'>{task.title}</Card.Title>
                            <Card.Text>

                            </Card.Text>
                            <Button variant="warning">Edit</Button>
                            <Button
                                variant="danger"
                                onClick={() => this.deleteTask(task._id)}
                            >Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

        return (
            <Container >
                <Row className='justify-content-center'>
                    <Col className='col-10'>
                        <InputGroup className="mb-3 mt-4">
                            <FormControl
                                type="text" onChange={this.handleChenge} value={inputValue}
                                className={styles.input} onKeyDown={this.addTaskKyeDown}
                                placeholder="Input new task" disabled={selectedTasksId.size}
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={this.addTask} style={{ fontSize: '20px' }}
                                    variant="outline-primary" disabled={selectedTasksId.size}>Add task</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-center text-center'>
                    <Col xs={6}>
                        <Button variant="outline-danger" onClick={this.deleteTasks}
                            disabled={!selectedTasksId.size}>Delete Tasks</Button>
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