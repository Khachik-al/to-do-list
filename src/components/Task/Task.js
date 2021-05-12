import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';

class Task extends Component {


   
    onselectTasks = () => {
        this.props.selectTasks(this.props.data._id)
        this.setState({
            selected: !this.props.selected
        })
    }

    render() {
        const task = this.props.data;
        const { deleteTask, selected } = this.props;
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ''} mt-3`}>
                <Card.Body>
                    <input type="checkbox" style={{ transform: 'scale(1.3)' }}
                        onChange={this.onselectTasks} checked={selected}
                    />
                    <Card.Title className='mt-1'>{task.title}</Card.Title>
                    <Card.Text>
                       {task.description}
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

Task.propTypes = {
    data: PropTypes.object.isRequired,
    selectTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;

