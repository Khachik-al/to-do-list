import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate, textTruncate } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editTaskToggle, activeDoneToggle } from '../../store/actions';


class Task extends PureComponent {
    state = {
        active: true
    }


    onselectTasks = () => {
        this.props.selectTasks(this.props.data._id)
        this.setState({
            selected: !this.props.selected
        })
    }
    activeDoneToggle = (taskaId, status) => {
        this.props.activeDoneToggle(taskaId, status)
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const task = this.props.data;
        const { deleteTask, selected, editTaskToggle } = this.props;
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ''} mt-5`}>
                <Card.Body>
                    <input type="checkbox" style={{ transform: 'scale(1.3)' }}
                        onChange={this.onselectTasks} checked={selected}
                    />
                    <Link
                        to={`/task/${task._id}`}
                        className={styles.link} >
                        <Card.Title className='mt-1'>{textTruncate(task.title, 25)}</Card.Title>
                    </Link>
                    <Card.Text>
                        Created at: {formatDate(task.created_at)}
                    </Card.Text>
                    <Card.Text>
                        Description: {textTruncate(task.description, 60)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(task.date)}
                    </Card.Text>
                    <Card.Text>
                        Status: {task.status}
                    </Card.Text>
                    {this.state.active ?
                        <Button
                            variant="success"
                            className='m-1'
                            onClick={() => this.activeDoneToggle(task._id, 'done')}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button> :
                        <Button
                            variant="secondary"
                            className='m-1'
                            onClick={() => this.activeDoneToggle(task._id, 'active')}
                        >
                            <FontAwesomeIcon icon={faRedo} />
                        </Button>}
                    <Button
                        variant="warning"
                        className='m-1'
                        onClick={() => editTaskToggle(task)}
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


function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}
let mapDispatchtoProps = {
    editTaskToggle,
    activeDoneToggle
}

export default connect(mapStateToProps, mapDispatchtoProps)(Task);


