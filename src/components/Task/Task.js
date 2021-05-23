import React, {  PureComponent  } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

class Task extends PureComponent  {
    



    onselectTasks = () => {
        this.props.selectTasks(this.props.data._id)
        this.setState({
            selected: !this.props.selected
        })
    }

    render() {
        const task = this.props.data;
        const { deleteTask, selected, editTask } = this.props;
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ''} mt-5`}>
                <Card.Body>
                    <input type="checkbox" style={{ transform: 'scale(1.3)' }}
                        onChange={this.onselectTasks} checked={selected}
                    />
                    <Card.Title className='mt-1'>{task.title}</Card.Title>
                    <Card.Text>
                        {task.description}
                    </Card.Text>
                    <Button
                        variant="warning"
                        className='m-1' 
                        onClick={()=>editTask(task)}
                        >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger" className='m-1'
                        onClick={() => deleteTask(task._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
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

