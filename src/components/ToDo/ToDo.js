import React, { Component } from 'react'
import styles from './style.module.css'
import { Container, Col, Row, Card, FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'


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
    handleClick = () => {
        let inputValue = this.state.inputValue.trim();
        if (!inputValue) { return; }
        let tasks = [...this.state.tasks, {text:this.state.inputValue}];
        this.setState({
            tasks,
            inputValue: ''
        })
    }

    render() {
        const { tasks, inputValue } = this.state;
        const taskComponents = tasks.map((el, index) => {
            return (
                <Col xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <Card style={{ width: '18rem' }} 
                          className={`${styles.task}${styles.selected}`}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                               {el.text}
                            </Card.Text>
                            <Button variant="warning">Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </Card.Body>  
                    </Card>
                </Col>
            )
        })


        return (
            <Container >
                <Row className={styles.inputContainer}>
                    <FormControl
                        type="text" onChange={this.handleChenge} value={inputValue}
                        className={styles.input} />
                    <Button onClick={this.handleClick} style={{fontSize:'30px'}} 
                    variant="outline-primary">Add task</Button>
                </Row>
                <Row className={styles.taskContainer}>
                    {taskComponents}
                </Row>
            </Container>
        );
    }
}

export default ToDo;