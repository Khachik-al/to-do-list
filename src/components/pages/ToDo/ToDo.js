import React, { PureComponent } from 'react';
import styles from './style.module.css'
import { Container, Col, Row, Button } from 'react-bootstrap';
import Task from '../../Task/Task';
import TaskInput from '../../inputTask/TaskInput';
import Confirm from '../../Confirm';
import EditTask from '../../EditTask/EditTask';
import { connect } from 'react-redux';
import { deleteTask, getTasks, deleteSelected, editTaskToggle } from '../../../store/actions';
import Search from '../../Search/Search';


class ToDo extends PureComponent {
    state = {
        selectedTasksId: new Set(),
        showConfirm: false,
        showAddTaskModal: false,
    }

    componentDidMount() {
        this.props.getTasks()
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                showAddTaskModal: false
            })
        }
    }
    deleteTask = (taskId) => {
        let newSet = this.state.selectedTasksId;
        newSet.delete(taskId);
        this.props.deleteTask(taskId)
        this.setState({
            selectedTasksId: newSet
        })
    }

    selectTasks = (taskId) => {
        let selectedTasksId = new Set(this.state.selectedTasksId)
        selectedTasksId.has(taskId) ? selectedTasksId.delete(taskId) : selectedTasksId.add(taskId);
        this.setState({
            selectedTasksId
        });
    };
    deleteSelectedTasks = () => {
        let { selectedTasksId } = this.state;

        let selectedTasks = this.props.tasks.filter((task) => {
            if (selectedTasksId.has(task._id)) {
                return false;
            }
            else { return true }
        })

        this.props.deleteSelected(selectedTasks, selectedTasksId)
        this.setState({
            showConfirm: !this.state.showConfirm,
            selectedTasksId: new Set()
        })
    }

    onToggleCloseModal = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    onSelectAll = () => {
        if (this.state.selectedTasksId.size === this.props.tasks.length) {
            this.setState({
                selectedTasksId: new Set()
            })
        }
        else {
            let selectedTasks = this.props.tasks.map((task) => task._id)
            this.setState({
                selectedTasksId: new Set(selectedTasks)
            })
        }
    }
    toggleOpenNewTaskModal = () => {
        this.setState({
            showAddTaskModal: !this.state.showAddTaskModal
        })
    }

    render() {
        const { selectedTasksId, showConfirm, showAddTaskModal } = this.state;
        const { tasks, editingTask, editTaskToggle } = this.props
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        editTask={this.props.editTasks}
                        data={task}
                        selectTasks={this.selectTasks}
                        deleteTask={this.deleteTask}
                        selected={selectedTasksId.has(task._id)}
                    />
                </Col>
            )
        })
        return (
            <div className={styles.toDo}>
                <Container className="mt-3">
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={8}>
                            <Search />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        {tasks.length ?
                            <Col xs={4} className={styles.deleteSelectedButton}>
                                <Button variant="danger" onClick={this.onToggleCloseModal}
                                    disabled={!selectedTasksId.size}>Delete selected</Button>
                            </Col>
                            : null
                        }
                        <Col xs={4} className='text-center'>
                            <Button
                                onClick={this.toggleOpenNewTaskModal}
                                variant="primary" disabled={!!selectedTasksId.size}
                            >Add task</Button>
                        </Col>
                        {tasks.length ?
                            <Col xs={4}>
                                <Button variant="warning" onClick={this.onSelectAll}
                                >{selectedTasksId.size === tasks.length ? "Deselect All" : "Selecte All"}
                                </Button>
                            </Col>
                            : null
                        }
                    </Row>
                    <Row className='justify-content-center'>
                        {taskComponents}
                    </Row>
                </Container>
                {showConfirm &&
                    <Confirm
                        onClose={this.onToggleCloseModal}
                        count={selectedTasksId.size}
                        onConfirm={this.deleteSelectedTasks}
                    />
                }
                {showAddTaskModal &&
                    <TaskInput
                        onClose={this.toggleOpenNewTaskModal}
                    />
                }
                {editingTask &&
                    <EditTask
                        onClose={editTaskToggle}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        editingTask: state.editingTask
    }
}

let mapDispatchtoProps = {
    getTasks,
    deleteTask,
    deleteSelected,
    editTaskToggle
}
export default connect(mapStateToProps, mapDispatchtoProps)(ToDo);



