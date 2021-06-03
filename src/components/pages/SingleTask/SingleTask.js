import { React, Component } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Task/taskStyle.module.css';
import { formatDate } from '../../../helpers/utils';
import EditTask from '../../EditTask/EditTask';


export default class SingleTask extends Component {
    state = {
        task: null,
        openEditModal: false
    }
    componentDidMount() {
        const taskId = this.props.match.params.taskId
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let task = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }
                this.setState({
                    task,
                })

            })
            .catch((error) => {
                console.log("error ", error);

            })

    }
    deleteTask = () => {
        fetch(`http://localhost:3001/task/${this.state.task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let task = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }
                this.props.history.push('/')
            })


            .catch((error) => {
                console.log("error ", error);

            })
    }
    onEdit=(editedTask)=>{

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify({...editedTask}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                let res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    }
                    else {
                        throw new Error('Somthing went wrong');
                    }
                }

                let task = editedTask;
                this.setState({
                    task,
                    openEditModal: null
                })
               
            })
            .catch((error) => {
                console.log("error ", error);

            })
        
    }
    editTask = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }
    toggleOpenEditTaskModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }


    render() {
        let { task, openEditModal } = this.state


        return (
            <>
                {task ?
                    <Container>
                        <Row className='justify-content-center text-center '>
                            <Col xs={12} >
                                <Card className={`${styles.task}  mt-5 `}>
                                    <Card.Body>
                                        <Card.Title className='mt-1'>{task.title}</Card.Title>
                                        <Card.Text>
                                            Description: {task.description}
                                        </Card.Text>
                                        <Card.Text>
                                            Date: {formatDate(task.date)}
                                        </Card.Text>
                                        <Button
                                            variant="warning"
                                            className='m-1'
                                        onClick={this.editTask}
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
                {openEditModal &&
                    <EditTask
                        onEdit={this.onEdit}
                        editingTask={this.state.task}
                        onClose={this.toggleOpenEditTaskModal}
                    />

                }

            </>
        )
    }
}