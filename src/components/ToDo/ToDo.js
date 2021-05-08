import React, { Component } from 'react'
import styles from './style.module.css'
import { Container, Col, Row, Card, FormControl, Button, InputGroup } from 'react-bootstrap'
import idGenerator from '../../helpers/idGenerator'


class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [

        ]
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
        let newTask = this.state.tasks.filter((el) => taskId !== el._id)
        this.setState({
            tasks: newTask
        })
    }
    addTaskKyeDown=(ev)=>{
        if(ev.key!=='Enter'){return;}
        this.addTask()
    }

    render() {
        const { tasks, inputValue } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}
                >
                    <Card className={`${styles.task} ${styles.selected} mt-2'`}>
                        <Card.Body>
                            <input type="checkbox" name="select-task" 
                                   id={task._id} style={{transform: 'scale(1.3)'}}/>
                            <Card.Title className='mt-1'>{task.title}</Card.Title>
                            <Card.Text>

                            </Card.Text>
                            <Button variant="warning">Edit</Button>
                            <Button variant="danger" onClick={() => this.deleteTask(task._id)}>Delete</Button>
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
                                placeholder="Recipient's username"
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={this.addTask} style={{ fontSize: '20px' }}
                                    variant="outline-primary">Add task</Button>
                            </InputGroup.Append>
                        </InputGroup>
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