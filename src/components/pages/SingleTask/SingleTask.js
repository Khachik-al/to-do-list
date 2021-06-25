import { React, Component } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Task/taskStyle.module.css';
import { formatDate } from '../../../helpers/utils';
import EditTask from '../../EditTask/EditTask';
import { connect } from 'react-redux';
import { activeDoneToggle, deleteTask, editTaskToggle, getSingleTask } from '../../../store/actions';
//?

class SingleTask extends Component {
    state = {
        active: true
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        this.props.getSingleTask(taskId)

    }
    deleteTask = () => {
        this.props.deleteTask(this.props.task._id)
        //?
        this.props.history.push('/')

    }
    activeDoneToggle = (taskaId, status) => {
        this.props.activeDoneToggle(taskaId, status)
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        let { task, editingTask, editTaskToggle } = this.props

        return (
            <div>
                {task ?
                    <Container>
                        <Row className='justify-content-center text-center '>
                            <Col xs={12} >
                                <Card className={`${styles.task}  mt-5 `}>
                                    <Card.Body>
                                        <Card.Title className='mt-1'>{task.title}</Card.Title>
                                        <Card.Text>
                                            Created at: {formatDate(task.created_at)}
                                        </Card.Text>
                                        <Card.Text>
                                            Description: {task.description}
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
                                            onClick={() => this.props.editTaskToggle(task)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button
                                            variant="danger" className='m-1'
                                            onClick={this.deleteTask}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    : ''}
                {editingTask &&
                    <EditTask
                        onClose={editTaskToggle}
                    />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        task: state.singleTask,
        editingTask: state.editingTask,
        errorMessage: state.errorMessage
    }
}
let mapDispatchtoProps = {
    getSingleTask,
    deleteTask,
    editTaskToggle,
    activeDoneToggle
}

export default connect(mapStateToProps, mapDispatchtoProps)(SingleTask);