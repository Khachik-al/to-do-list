import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import styles from './taskStyle.module.css'

class Task extends Component {
    state = {
        selected: false
    }
    onselectTasks = () => {
        this.props.selectTasks(this.props.data._id)
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        const task = this.props.data;
        const { deleteTask } = this.props;
        return (
            <Card className={`${styles.task} ${this.state.selected ? styles.selected : ''} mt-3`}>
                <Card.Body>
                    <input type="checkbox" style={{ transform: 'scale(1.3)' }}
                        onChange={this.onselectTasks}
                    />
                    <Card.Title className='mt-1'>{task.title}</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                    </Card.Text>
                    <Button variant="warning" >Edit</Button>
                    <Button

                        variant="danger"
                        onClick={() => deleteTask(task._id)}
                    >Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Task;